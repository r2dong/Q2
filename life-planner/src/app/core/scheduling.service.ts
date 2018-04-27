import { Injectable, TRANSLATIONS } from '@angular/core'
import { Observable } from 'rxjs'
import { TaskService } from '../tasks/task.service'
import { TaskModel, TimeSlot } from '../tasks/task.model'
import * as stubTaskLists from '../../testing/dummyTasks'

/*
Stuff to add
1. (done) restrict shcedule to daytime (9am - 5pm)
2. add breaks
3. add lunch time, etc
4. put some transition time between tasks
5. (done) split 1 task into two parts
6. working around events
7. a helper function for comparing time
8. take due of non-urgents into consideration, might overdue without it 
*/

/*
some edge cases
done 1. no weight -> assume weight = 10 mins
done 2. no due -> put as last tasks for important/non-important regions, 
   break ties evenly
done 3. all input tasks have no due date
done 4. empty input task list
*/

/* optimizations
- a method that subtracts any number of Days (simple loop will do)
- a method that compares Dates
- a method that checks if a Date is contained within an interval
*/

/*
next: fix bug where schedule shifted during day when scheudling nodueList
with current time = ~15:15
*/
// internal value of time
export const hourVal: number =
  new Date(2018, 3, 8, 10).valueOf() -
  new Date(2018, 3, 8, 9).valueOf()
const dayVal: number =
  new Date(2018, 3, 9).valueOf() -
  new Date(2018, 3, 8).valueOf()
const minuteVal: number =
  new Date(2018, 3, 8, 10, 2).valueOf() -
  new Date(2018, 3, 8, 10, 1).valueOf()
  // ten minutes (1 / 6 of an hour)
const defaulthours: number = 1 / 6


// map month to days in those month
const dayInMonth: Map<number, number> = new Map(
  [
    [0, 31], // January
    [1, 28], // February, edge case handled in fucntion
    [2, 31], // ...
    [3, 30],
    [4, 31],
    [5, 30],
    [6, 31],
    [7, 31],
    [8, 30],
    [9, 31],
    [10, 30],
    [11, 31]
  ]
)

@Injectable()
export class SchedulingService {

  currentDate: Date;

  constructor(private taskService: TaskService) { }

  /*
  - shcedule - should contain only scheduled tasks
  - tasks - tasks to be stuffed into the schedule
  */
  private interleave(schedule: TaskModel[], tasks: TaskModel[]): TaskModel[] {
    
    /* get occupied time slot from given schedule */
    let allScheduledSlots: TimeSlot[] = []
    schedule.forEach((task: TaskModel) => {
      task.schedule.forEach((slot: TimeSlot) => {
        allScheduledSlots.push(slot)
      })
    })
    /* sort the given time slots (assuming they don't overlap) */
    allScheduledSlots.sort((s1: TimeSlot, s2: TimeSlot) => {
      return s1.start.valueOf() - s2.start.valueOf()
    })
    /* get open time slots for interleaving */
    let timeSlots: TimeSlot[] = []
    let startTime: Date // starting time of next time slot
    let endTime: Date // ending time " "
    allScheduledSlots.forEach((slot: TimeSlot) => {
      endTime = slot.start
      if (!(startTime === undefined) && 
          !(startTime.valueOf() == endTime.valueOf())) { /* skip 0 lenght slots */
        timeSlots.push({
          start: startTime,
          end: endTime
        })
      }
      startTime = slot.end
    })
    timeSlots = this.findValidSlots(timeSlots)
    
    console.log("valid time slots:")
    timeSlots.forEach((s: TimeSlot) => {
      console.log("start: " + s.start.toLocaleString())
      console.log("end: " + s.end.toLocaleString() + "\n")
    })

    // sort tasks to interleave with duration
    tasks.sort((t1, t2) => {
      let hours1: number = t1.hours === undefined ? defaulthours : t1.hours
      let hours2: number = t2.hours === undefined ? defaulthours : t2.hours
      return hours1 - hours2
    })

    /* should probably apply some ordering to tasks to be interleaved as well
    ignoring that for now
    */
    let start: Date
    let end: Date
    let preEnd: Date
    let curTask: IteratorResult<TaskModel> = {
      value: undefined,
      done: false
    }
    let curSlot: IteratorResult<TimeSlot>
    let timeRemain: number = 0
    let slotIterator: Iterator<TimeSlot> = timeSlots[Symbol.iterator]()
    let taskIterator: Iterator<TaskModel> = tasks[Symbol.iterator]()

    while (true) {
      console.log('interleaving')
      // retrieve next time slot if current one is completely filled
      while (start == end) { //skip length-0 slots
        if (start != undefined && end != undefined)
          console.log("skipping 0 length slot, start: " + start.toLocaleString() + ", end: " + end.toLocaleString())
        preEnd = end
        curSlot = slotIterator.next()
        if (curSlot.done) {
          /* edge case of nothing scheduled earlier, preEnd = undefined
          use time left for current day
          */
          if (preEnd == undefined)
            start = this.roundUpToStartOfDay(new Date())
          else {
            start = this.addDay(preEnd)
            console.log("adding day to preEnd: " + preEnd.toLocaleString())
            console.log("addition result = " + start.toLocaleString())
            start.setHours(9)
            console.log("after setting hours, start = " + start.toLocaleString())
          }
          end = this.copyDate(start)
          end.setHours(17)
        }
        else {
          start = curSlot.value.start
          end = curSlot.value.end
        }
      }

      // if finished with interleaving previous task, continue to next one
      if (timeRemain == 0) {
        curTask = taskIterator.next()
        if (curTask.done)
          break
        if (curTask.value.schedule === undefined)
          curTask.value.schedule = []
        timeRemain = curTask.value.hours === undefined ? defaulthours : curTask.value.hours
        timeRemain *= hourVal
      }

      // interleave tasks
      // current slot not/just enough for the task
      if (timeRemain >= end.valueOf() - start.valueOf()) {
        curTask.value.schedule.push({
          start: start,
          end: end
        })
        timeRemain -= end.valueOf() - start.valueOf()
        start = end
      }
      // current task not enough for the slot
      else if (timeRemain < end.valueOf() - start.valueOf()) {
        curTask.value.schedule.push({
          start: start,
          end: new Date(start.valueOf() + timeRemain)
        })
        start = new Date(start.valueOf() + timeRemain)
        timeRemain = 0
      }
    }

    return schedule.concat(tasks)
  }

  /* return a list of valid time slots (9am - 5pm) */
  private findValidSlots(raw: TimeSlot[]): TimeSlot[] {

    /* edge case of raw length = 0 (i.e, nothing scheduled yet) */
    if (raw.length == 0)
      return []

    /* initializations */
    raw.sort((s1, s2) => {
      return s1.start.valueOf() - s2.start.valueOf()
    })
    /* TODO, optimize with a method that subtracts various amounts of days */
    let curStart: Date = this.roundToStartOfDay(this.subtractDay(this.subtractDay(raw[0].start)))
    let curEnd: Date = this.copyDate(curStart)
    curEnd.setHours(17)
    const lastEnd: Date = this.addDay(raw[raw.length - 1].end)
    let flag1: boolean
    let ind1: number
    let flag2: boolean
    let ind2: number
    let out: TimeSlot[] = []

    /* find all valid slots */
    /* the for loops can be optimized, does not have to start form beginning every time */
    while (curEnd < lastEnd) {
      console.log("find valid slot")
      flag1 = false
      flag2 = false
      for (let i = 0; i < raw.length; i++) {
        if (curStart> raw[i].start && curStart < raw[i].end) {
          flag1 = true
          ind1 = i
        }
        if (raw[i].start> curStart && raw[i].start < curEnd) {
          flag2 = true
          ind2 = i
        }
      }

      let nextSlot: TimeSlot = {
        start: curStart,
        end: curEnd
      }

      /* current start time contained in one of the raw slots */
      if (flag1) {
        nextSlot.start = curStart
        nextSlot.end = curEnd < raw[ind1].end ? curEnd : raw[ind1].end
        /* avoid 0 - length slots */
        if (nextSlot.start.valueOf() != nextSlot.end.valueOf())
          out.push(nextSlot)
      }
      /* start time of one of the raw slots contained in current valid slot */
      else if (flag2) {
        nextSlot.start = raw[ind2].start
        nextSlot.end = curEnd < raw[ind2].end ? curEnd : raw[ind2].end
        /* avoid 0 - length slots */
        if (nextSlot.start.valueOf() != nextSlot.end.valueOf())
          out.push(nextSlot)
      }
      /* no raw slot overlap with the current valid slot */
      else {
        nextSlot.end = curEnd
      }
      curStart = nextSlot.end
      if (curStart.valueOf() == curEnd.valueOf()) {
        curStart = this.addDay(curStart)
        curStart.setHours(9)
        curEnd = this.addDay(curEnd)
      }
    }
    return out
  }

  /* Assign scheduled time to tasks in a way that they are finished right
  before due
  assuming that a no overdue schedule exists
  assume weight = time needed in hours
  to avoid overlapping of tasks go from right to left, use min(start of 
  current task, due of previous task) as basis of pushing previous task to
  right.
  */
  private pushRight(tasks: TaskModel[]): TaskModel[] {

    // edge case of empty task list
    if (tasks.length == 0)
      return tasks
    
    // do this by a slot basis similar to interleaving
    let basis: Date
    let start: Date
    let curDayStart: Date
    let curDayEnd: Date
    let timeRemain: number
    let taskIterator: Iterator<TaskModel>
    let task: IteratorResult<TaskModel>

    // intialization
    basis = this.roundToEndOfDay(tasks[tasks.length - 1].dueDateTime )
    curDayEnd = basis // probably can refactor into one variable
    curDayStart = this.copyDate(basis)
    curDayStart.setHours(9)
    timeRemain = 0

    // we want reversed iteration order
    tasks = tasks.reverse()
    taskIterator = tasks[Symbol.iterator]()
    task = {
      value: undefined,
      done: false
    }

    let flag: boolean = true
    while (flag) {
     
      // if finished scheduling current task, continue to next one
      if (timeRemain == 0) {
        task = taskIterator.next()
        if (task.done) {
          break
        }
        else {
          if (task.value.schedule === undefined)
            task.value.schedule = []
          // update basis
          basis = task.value.dueDateTime < basis ? task.value.dueDateTime  : basis
          basis = this.roundToEndOfDay(basis)
          curDayStart.setDate(basis.getDate())
          curDayEnd.setDate(basis.getDate())
          timeRemain = task.value.hours === undefined ? defaulthours : task.value.hours
          timeRemain *= hourVal
        }
      }

      // if current day fully filled, continue to previous day
      if (basis == curDayStart) {
        //console.log("current day filled")
        curDayEnd = this.subtractDay(curDayEnd)
        curDayStart = this.subtractDay(curDayStart)
        basis = curDayEnd
      }

      // if remaining day not enough for remainder of task
      if (basis.valueOf() - curDayStart.valueOf() < timeRemain) {
        task.value.schedule.push({
          start: curDayStart,
          end: basis
        })
        timeRemain -= basis.valueOf() - curDayStart.valueOf()
        basis = curDayStart
      }
      // if remaining day enough for remainder of task
      else {
        let newStart: Date = new Date(basis.valueOf() - timeRemain)
        task.value.schedule.push({
          start: newStart,
          end: basis
        })
        timeRemain = 0
        basis = newStart
      }
    }

    return tasks
  }

  /* round a due to the neareast end of day, if it dues at night.
  we don't want to modify the orignal due */
  private roundToEndOfDay(dueDate: Date): Date {
    let newDue: Date = this.copyDate(dueDate)
    if (dueDate.getHours() > 17 ||
      dueDate.getHours() == 17 && dueDate.getMinutes() > 0) {
      newDue.setHours(17)
      newDue.setMinutes(0)
    }
    else if (dueDate.getHours() <= 9) {
      newDue = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate(), 17)
      newDue = this.subtractDay(newDue)
    }
    return newDue
  }
  
  /* round DOWN to the nearest start of day */
  private roundToStartOfDay(startDay: Date): Date {
    let newStart: Date = this.copyDate(startDay)
    if (startDay.getHours() < 9)
      newStart = this.subtractDay(newStart)
    newStart.setHours(9)
    newStart.setMinutes(0)
    return newStart
  }

  /* round UP to a nearest valid time point for scheduling */
  private roundUpToStartOfDay(date: Date): Date {
    let newDate: Date = this.copyDate(date)
    if (date.getHours() > 9)
      if (date.getHours() < 16 ||
          date.getHours() == 17 &&
            (
              date.getMinutes() == 0 ||
              date.getSeconds() == 0 ||
              date.getMilliseconds() == 0
            )
         ) 
        return newDate
    newDate = this.addDay(newDate)
    newDate = this.trimDate(newDate)
    newDate.setHours(9)
    newDate.setMinutes(0)
    return newDate
  }

  /* remove the second and milli-second part of a date */
  private trimDate(date: Date): Date {
    let newDate: Date = this.copyDate(date)
    newDate.setSeconds(0)
    newDate.setMilliseconds(0)
    return newDate
  }

  private copyDate(date: Date): Date {
    return new Date(date.valueOf())
  }

  private subtractDay(date: Date): Date {
    return new Date(date.valueOf() - dayVal)
  }

  private addDay(date: Date) {
    return new Date(date.valueOf() + dayVal)
  }

  /* month is 0 based */
  private getNumDaysInMonth(year: number, month: number): number {
    if (month != 1)
      return dayInMonth.get(month)
    else
      if (year % 4 != 0)
        return dayInMonth.get(month)
      else
        return 29
  }

  /* filter tasks into the four quadrants */
  private filter(tasks: TaskModel[]): Map<number, TaskModel[]> {
    let q1: TaskModel[] = []
    let q2: TaskModel[] = []
    let q3: TaskModel[] = []
    let q4: TaskModel[] = []

    // characterize all tasks
    for (let i: number = 0; i < tasks.length; i++) {
      if (tasks[i].urgent && tasks[i].important)
        q1.push(tasks[i]);
      else if (tasks[i].urgent && !tasks[i].important)
        q3.push(tasks[i]);
      else if (!tasks[i].urgent && tasks[i].important)
        q2.push(tasks[i]);
      else if (!tasks[i].urgent && !tasks[i].important)
        q4.push(tasks[i]);
    }

    let quadrants: Map<number, TaskModel[]>
    quadrants = new Map<number, TaskModel[]>()
    quadrants.set(1, q1)
    quadrants.set(2, q2)
    quadrants.set(3, q3)
    quadrants.set(4, q4)

    return quadrants
  }

  createSchedule(): Observable<TaskModel[]> {

    // divide tasks into according quadrants
    let quadrants: Map<number, TaskModel[]>
    
    //this.taskService.getTasks().subscribe(tasks => {
    //  quadrants = this.filter(tasks)
    //})
    
    quadrants = this.filter(stubTaskLists.dummyTasks)
    let q1: TaskModel[] = quadrants.get(1)
    let q2: TaskModel[] = quadrants.get(2)
    let q3: TaskModel[] = quadrants.get(3)
    let q4: TaskModel[] = quadrants.get(4)
    let urgentTasks: TaskModel[]
    urgentTasks = q1.concat(q3)

    // sort urgent tasks by increasing deadline (greedy algorithm)
    urgentTasks.sort((t1, t2) => {
      if (t1.dueDateTime  && t2.dueDateTime  === undefined)
        return 0
      else if (t1.dueDateTime  === undefined)
        return Number.MAX_SAFE_INTEGER
      else if (t1.dueDateTime  === undefined)
        return Number.MIN_SAFE_INTEGER
      else
        return t1.dueDateTime .valueOf() - t2.dueDateTime .valueOf()
    })

    // remove urgent tasks with no dueDateTime date
    let noDueNum: number = 0
    let noDues: TaskModel[]
    for (let i: number = urgentTasks.length - 1; i >= 0; i--) {
      if (urgentTasks[i].dueDateTime  !== undefined)
        break
      noDueNum++
    }
    noDues = urgentTasks.splice(urgentTasks.length - noDueNum, noDueNum)

    // make space for interleaving
    console.log("\npushing right\n")
    let pushRightSchedule: TaskModel[] = this.pushRight(urgentTasks)
    // urgent tasks with no due date interleaveb first
    console.log("\nadding no dues\n")
    let urgentInt: TaskModel[] = this.interleave(pushRightSchedule, noDues)
    console.log("\nadding q2\n")
    let addq2: TaskModel[] = this.interleave(urgentInt, q2)
    console.log("\nadding q4\n")
    let addq4: TaskModel[] = this.interleave(addq2, q4)
    return Observable.of(addq4)
  }
  
}
