import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DummyTaskModel, dummyTasks } from '../../testing/dummyTasks'

/*
Stuff to add
1. restrict shcedule to daytime
2. add breaks
3. add lunch time, etc
4. put some transition time between tasks
5. split 1 task into two parts
6. working around events
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
  
  constructor() {}

  /*
  - shcedule - should contain only scheduled tasks
  - tasks - tasks to be stuffed into the schedule
  */
  private interleave(schedule: DummyTaskModel[], tasks: DummyTaskModel[]): DummyTaskModel[] {

    // sort schedule into consecutive tasks
    schedule.sort((t1, t2) => {
      return t1.start.valueOf() - t2.start.valueOf()
    })
    
    // key/value of Map = start/end time of time slots
    let timeSlots: Map<Date, Date> = new Map<Date, Date>()
    let curWeight: number
    let startTime: Date // starting time of next time slot
    for (let i: number = 0; i < schedule.length - 1; i++) {
      if (schedule[i].weight === undefined)
        curWeight = defaultWeight
      else
        curWeight = schedule[i].weight
      startTime = new Date(schedule[i].start.valueOf() + curWeight * hourVal)
      timeSlots.set(startTime, schedule[i + 1].start)
    }
    
    // sort tasks to interleave with duration
    tasks.sort((t1, t2) => {
      let weight1: number = t1.weight === undefined ? defaultWeight : t1.weight
      let weight2: number = t2.weight === undefined ? defaultWeight : t2.weight
      return weight1 - weight2
    })

    /* should probably apply some ordering to tasks to be interleaved as well
    ignoring that for now
    */
    let curStart: Date
    let nextTask: DummyTaskModel
    let nextWeight: number
    timeSlots.forEach((value, key, map) => {
      curStart = key
      /* modifying a list during iteration here. currently seems working,
      but might break in future
      */
      for (let i: number = tasks.length - 1; i >= 0; i--) {
        nextWeight = tasks[i].weight === undefined ? defaultWeight : tasks[i].weight
        if (value.valueOf() - curStart.valueOf() > nextWeight * hourVal) {
          nextTask = tasks.splice(i, 1)[0]
          nextTask.start = curStart
          // update starting time of time slot
          curStart = new Date(curStart.valueOf() + nextWeight * hourVal)
          schedule.push(nextTask)
        }
      }
    })
    
    return schedule
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
      tasks[i].start = start
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
