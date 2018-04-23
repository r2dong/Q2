import { Injectable, TRANSLATIONS } from '@angular/core'
import { Observable } from 'rxjs'
import { DummyTaskModel, dummyTasks, TimeSlot } from '../../testing/dummyTasks'

/*
Stuff to add
1. (done) restrict shcedule to daytime (9am - 5pm)
2. add breaks
3. add lunch time, etc
4. put some transition time between tasks
5. (done) split 1 task into two parts
6. working around events
7. a helper function for comparing time
*/

/*
some edge cases
done 1. no weight -> assume weight = 10 mins
done 2. no due -> put as last tasks for important/non-important regions, 
   break ties evenly
3. all input tasks have no due date?
*/

/* optimizations
- a method that subtracts any number of Days (simple loop will do)
- a method that compares Dates
- a method that checks if a Date is contained within an interval
*/

// internal value of time
const hourVal: number =
  new Date(2018, 3, 8, 10).valueOf() -
  new Date(2018, 3, 8, 9).valueOf()
const minuteVal: number =
  new Date(2018, 3, 8, 10, 2).valueOf() -
  new Date(2018, 3, 8, 10, 1).valueOf()
// ten minutes (1 / 6 of an hour)
const defaultWeight: number = 1 / 6

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

  constructor() { }

  /*
  - shcedule - should contain only scheduled tasks
  - tasks - tasks to be stuffed into the schedule
  */
  private interleave(schedule: DummyTaskModel[], tasks: DummyTaskModel[]): DummyTaskModel[] {

    /* get occupied time slot from given schedule */
    let allScheduledSlots: TimeSlot[] = []
    schedule.forEach((task: DummyTaskModel) => {
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
      if (!(startTime === undefined)) {
        timeSlots.push({
          start: startTime,
          end: endTime
        })
      }
      startTime = slot.end
    })
    timeSlots = this.findValidSlots(timeSlots)

    // sort tasks to interleave with duration
    tasks.sort((t1, t2) => {
      let weight1: number = t1.weight === undefined ? defaultWeight : t1.weight
      let weight2: number = t2.weight === undefined ? defaultWeight : t2.weight
      return weight1 - weight2
    })

    /* should probably apply some ordering to tasks to be interleaved as well
    ignoring that for now
    */
    let start: Date
    let end: Date
    let preEnd: Date
    let curTask: IteratorResult<DummyTaskModel> = {
      value: undefined,
      done: false
    }
    let curSlot: IteratorResult<TimeSlot> = {
      value: undefined,
      done: false
    }
    let timeRemain: number = 0
    let slotIterator: Iterator<TimeSlot> = timeSlots[Symbol.iterator]()
    let taskIterator: Iterator<DummyTaskModel> = tasks[Symbol.iterator]()

    while (true) {

      // retrieve next time slot if current one is completely filled
      while (start == end) { //skip length-0 slots
        preEnd = end
        curSlot = slotIterator.next()
        if (curSlot.done) {
          start = this.addDay(preEnd)
          start.setHours(9)
          end = this.addDay(preEnd)
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
        timeRemain = curTask.value.weight === undefined ? defaultWeight : curTask.value.weight
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

    /* if all slots cannot acommodate interleaving tasks */
    /* first handle the partially shceudled task, if any */
    start = allScheduledSlots[allScheduledSlots.length - 1].end
    if (timeRemain > 0) {
      end = new Date(start.valueOf() + timeRemain)
      if (curTask.value.schedule == undefined)
        curTask.value.schedule = []
      curTask.value.schedule.push({
        start: start,
        end: end
      })
      start = end
      curTask = taskIterator.next()
    }
    /* then schedule all remaining tasks back to back */
    while (!curTask.done) {
      let curWeight: number
      curWeight = curTask.value.weight != undefined ? curTask.value.weight : defaultWeight
      end = new Date(start.valueOf() + curWeight * hourVal)
      if (curTask.value.schedule == undefined)
        curTask.value.schedule = []
      curTask.value.schedule.push({
        start: start,
        end: end
      })
      start = end
      curTask = taskIterator.next()
    }

    return schedule.concat(tasks)
  }

  /* return a list of valid time slots (9am - 5pm) */
  private findValidSlots(raw: TimeSlot[]): TimeSlot[] {
    
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
    while (curEnd.valueOf() < lastEnd.valueOf()) {
      flag1 = false
      flag2 = false
      for (let i = 0; i < raw.length; i++) {
        if (curStart.valueOf() > raw[i].start.valueOf() && curStart.valueOf() < raw[i].end.valueOf()) {
          flag1 = true
          ind1 = i
        }
        if (raw[i].start.valueOf() > curStart.valueOf() && raw[i].start.valueOf() < curEnd.valueOf()) {
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
        nextSlot.end = curEnd.valueOf() < raw[ind1].end.valueOf() ? curEnd : raw[ind1].end
        out.push(nextSlot)
      }
      /* start time of one of the raw slots contained in current valid slot */
      else if (flag2) {
        nextSlot.start = raw[ind2].start
        nextSlot.end = curEnd.valueOf() < raw[ind2].end.valueOf() ? curEnd : raw[ind2].end
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
  private pushRight(tasks: DummyTaskModel[]): DummyTaskModel[] {

    // do this by a slot basis similar to interleaving
    let basis: Date
    let start: Date
    let curDayStart: Date
    let curDayEnd: Date
    let timeRemain: number
    let taskIterator: Iterator<DummyTaskModel>
    let task: IteratorResult<DummyTaskModel>

    // intialization
    basis = this.roundToEndOfDay(tasks[tasks.length - 1].due)
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
          basis = task.value.due.valueOf() < basis.valueOf() ? task.value.due : basis
          basis = this.roundToEndOfDay(basis)
          curDayStart.setDate(basis.getDate())
          curDayEnd.setDate(basis.getDate())
          timeRemain = task.value.weight === undefined ? defaultWeight : task.value.weight
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

  private roundToStartOfDay(startDay: Date): Date {
    let newStart: Date = this.copyDate(startDay)
    if (startDay.getHours() < 9)
      newStart = this.subtractDay(newStart)
    newStart.setHours(9)
    newStart.setMinutes(0)
    return newStart
  }

  private copyDate(date: Date): Date {
    let newDate: Date = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
    return newDate
  }

  private subtractDay(date: Date): Date {
    let preDate: Date = this.copyDate(date)
    let newDate: number = date.getDate()
    let newMonth: number = date.getMonth()
    let newYear: number = date.getFullYear()
    newDate -= 1
    if (newDate != 0) {
      preDate.setDate(newDate)
      return preDate
    }
    else {
      newMonth -= 1
      if (newMonth >= 0) {
        newDate = this.getNumDaysInMonth(newYear, newMonth)
        preDate.setMonth(newMonth)
        preDate.setDate(newDate)
        return preDate
      }
      else { // edge case of subtracting first day of a year
        preDate.setMonth(12)
        preDate.setDate(31)
        preDate.setFullYear(newYear - 1)
        return preDate
      }
    }
  }

  private addDay(date: Date) {
    let preDate: Date = this.copyDate(date)
    let newDate: number = date.getDate()
    let newMonth: number = date.getMonth()
    let newYear: number = date.getFullYear()
    newDate += 1
    if (newDate <= this.getNumDaysInMonth(newYear, newMonth)) {
      preDate.setDate(newDate)
      return preDate
    }
    else {
      newMonth += 1
      if (newMonth <= 11) {
        preDate.setMonth(newMonth)
        preDate.setDate(1)
        return preDate
      }
      else { // edge case of adding to last day of a year
        preDate.setMonth(1)
        preDate.setDate(1)
        preDate.setFullYear(newYear + 1)
        return preDate
      }
    }
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
  private filter(tasks: DummyTaskModel[]): Map<number, DummyTaskModel[]> {
    let q1: DummyTaskModel[] = []
    let q2: DummyTaskModel[] = []
    let q3: DummyTaskModel[] = []
    let q4: DummyTaskModel[] = []

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

    let quadrants: Map<number, DummyTaskModel[]>
    quadrants = new Map<number, DummyTaskModel[]>()
    quadrants.set(1, q1)
    quadrants.set(2, q2)
    quadrants.set(3, q3)
    quadrants.set(4, q4)

    return quadrants
  }

  createSchedule(): Observable<DummyTaskModel[]> {

    // divide tasks into according quadrants
    let quadrants: Map<number, DummyTaskModel[]> = this.filter(dummyTasks)
    let q1: DummyTaskModel[] = quadrants.get(1)
    let q2: DummyTaskModel[] = quadrants.get(2)
    let q3: DummyTaskModel[] = quadrants.get(3)
    let q4: DummyTaskModel[] = quadrants.get(4)
    let urgentTasks: DummyTaskModel[]
    urgentTasks = q1.concat(q3)

    // sort urgent tasks by increasing deadline (greedy algorithm)
    urgentTasks.sort((t1, t2) => {
      if (t1.due && t2.due === undefined)
        return 0
      else if (t1.due === undefined)
        return Number.MAX_SAFE_INTEGER
      else if (t1.due === undefined)
        return Number.MIN_SAFE_INTEGER
      else
        return t1.due.valueOf() - t2.due.valueOf()
    })

    // remove urgent tasks with no due date
    let noDueNum: number = 0
    let noDues: DummyTaskModel[]
    for (let i: number = urgentTasks.length - 1; i >= 0; i--) {
      if (urgentTasks[i].due !== undefined)
        break
      noDueNum++
    }
    noDues = urgentTasks.splice(urgentTasks.length - noDueNum, noDueNum)

    // make space for interleaving
    let pushRightSchedule: DummyTaskModel[] = this.pushRight(urgentTasks)
    // urgent tasks with no due date interleaveb first
    let urgentInt: DummyTaskModel[] = this.interleave(pushRightSchedule, noDues)
    let addq2: DummyTaskModel[] = this.interleave(urgentInt, q2)
    let addq4: DummyTaskModel[] = this.interleave(pushRightSchedule, q4)
    return Observable.of(addq4)
  }
  
}
