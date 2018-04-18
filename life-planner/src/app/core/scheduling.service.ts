import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DummyTaskModel, dummyTasks, TimeSlot } from '../../testing/dummyTasks'
import { Time } from '@angular/common';

/*
Stuff to add
1. restrict shcedule to daytime
2. add breaks
3. add lunch time, etc
4. put some transition time between tasks
5. split 1 task into two parts
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

// internal value of time
const hourVal: number =
  new Date(2018, 3, 8, 10).valueOf() -
  new Date(2018, 3, 8, 9).valueOf()
const minuteVal: number =
  new Date(2018, 3, 8, 10, 2).valueOf() -
  new Date(2018, 3, 8, 10, 1).valueOf()
// ten minutes (1 / 6 of an hour)
const defaultWeight: number = 1 / 6

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
      if (start == end) {
        curSlot = slotIterator.next()
        if (curSlot.done)
          break
        start = curSlot.value.start
        end = curSlot.value.end
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
      curTask.value.schedule.push({
        start: start,
        end: end
      })
      start = end
      curTask = taskIterator.next()
    }
    /* then schedule all remaining tasks back to back */
    while (!curTask.done) {
      //console.log(curTask)
      let curWeight: number
      curWeight = curTask.value.weight != undefined ? curTask.value.weight : defaultWeight
      end = new Date(start.valueOf() + curWeight * hourVal)
      curTask.value.schedule.push({
        start: start,
        end: end
      })
      start = end
    }
    
    return schedule.concat(tasks)
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
    let basis: Date = tasks[tasks.length - 1].due;
    let start: Date
    let curWeight: number
    for (let i: number = tasks.length - 1; i > -1; i--) {
      curWeight =
        tasks[i].weight === undefined ? defaultWeight : tasks[i].weight
      start = new Date(basis.valueOf() - curWeight * hourVal)
      if (tasks[i].schedule === undefined)
        tasks[i].schedule = []
      tasks[i].schedule.push({
        start: start,
        end: basis
      })
      if (i != 0)
        if (start.valueOf() < tasks[i - 1].due.valueOf())
          basis = start;
        else
          basis = tasks[i - 1].due;
    }
    return tasks
  }

  // filter tasks into the four quadrants
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

  private updateCurrentTime() {
    this.currentDate = new Date(Date.now());
    console.log("Updated current date to: " + this.currentDate.getDate());
    console.log("Updated current Month to: " + this.currentDate.getMonth());
  }

  createSchedule(): Observable<DummyTaskModel[]> {

    // divide tasks into according quadrants
    let quadrants: Map<number, DummyTaskModel[]> = this.filter(dummyTasks)
    let q1: DummyTaskModel[] = quadrants.get(1)
    let q2: DummyTaskModel[] = quadrants.get(2)
    let q3: DummyTaskModel[] = quadrants.get(3)
    let q4: DummyTaskModel[] = quadrants.get(4)
    let urgentTasks: DummyTaskModel[]
    urgentTasks = quadrants.get(1).concat(quadrants.get(3))

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
    let addq4: DummyTaskModel[] = this.interleave(addq2, q4)
    return Observable.of(addq4)
  }
}
