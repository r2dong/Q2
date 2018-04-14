import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

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
1. no weight -> assume weight = 10 mins
2. no due -> put as last tasks for important/non-important regions, 
   break ties evenly
3. all input tasks have no due date?
*/

// internal value of time
const hourVal: number = 
  new Date(2018, 3, 8, 10).valueOf() - new Date(2018, 3, 8, 9).valueOf()
const minuteVal: number =
  new Date(2018, 3, 8, 10, 2).valueOf() - new Date(2018, 3, 8, 10, 1).valueOf()
const defaultWeight: number = 1 / 6 // ten minutes (1 / 6 of an hour)

// stubbing interface, use imported interface when actual one completed
export interface DummyTaskModel {
  name: string
  urgent: boolean
  important: boolean
  dueDateTime?: Date
  isComplete: boolean
  weight?: number
  scheduledTime?: Date
}

// dummy tasks for testing algorithms
// year month day hour minute second millisecond
const dummyTasks: DummyTaskModel[] = [
  {
    name: "rob a bank",
    urgent: true,
    important: true,
    dueDateTime: new Date(2018, 3, 5, 9, 0),
    isComplete: false,
    weight: 10
  },
  {
    name: "pass this course",
    urgent: true,
    important: true,
    dueDateTime: new Date(2018, 3, 10, 9, 0),
    isComplete: false,
    weight: 6
  },
  {
    name: "go to the gym",
    urgent: true,
    important: true,
    dueDateTime: new Date(2018, 3, 15, 9, 0),
    isComplete: false,
    weight: 5
  },
  {
    name: "eat tacos",
    urgent: true,
    important: true,
    dueDateTime: new Date(2018, 3, 20, 9, 0),
    isComplete: false,
    weight: 1
  },
  {
    name: "length-2400-interleave",
    urgent: false,
    important: false,
    isComplete: false,
    weight: 2400
  },
  {
    name: "length-100-interleave",
    urgent: false,
    important: false,
    isComplete: false,
    weight: 100
  },
  {
    name: "length-3-interleave",
    urgent: false,
    important: false,
    isComplete: false,
    weight: 3
  },
  {
    name: "length-5-interleave",
    urgent: false,
    important: false,
    isComplete: false,
    weight: 5
  },
  {
    name: "no-due-10-urg-imp",
    urgent: true,
    important: true,
    isComplete: false,
    weight: 10
  },
  {
    name: "no-due-5-nonurg-nonimp",
    urgent: false,
    important: false,
    isComplete: false,
    weight: 5
  },
]

@Injectable()
export class SchedulingService {

  currentDate: Date;
  
  //constructor(private taskService: TaskService) {}
  //createScheduleObWrapper() {
  //  this.taskService.getTasks().subscribe(tasks => {});
  //}
  
  constructor() {}

  // assume shcedule to have start time all assigned, tasks are tasks to be
  // stuffed into the schedule, schedule should be sorted
  private interleave(schedule: DummyTaskModel[], tasks: DummyTaskModel[]): DummyTaskModel[] {

    // sort schedule into consecutive tasks
    schedule.sort((t1, t2) => {
      return t1.scheduledTime.valueOf() - t2.scheduledTime.valueOf()
    })
    
    // find time slots available for interleaving
    // start and end of each time slot
    let timeSlots: Map<Date, Date> = new Map<Date, Date>()
    let curWeight: number
    let startTime: Date // starting time of next time slot
    for (let i: number = 0; i < schedule.length - 1; i++) {
      // tasks with no duedate should not be in shcedule yet, this is fine
      //console.log("making a new time slot")
      //console.log("task1: " + schedule[i].name)
      //console.log(schedule[i].dueDateTime.toLocaleString())
      //console.log(schedule[i + 1].scheduledTime.toLocaleString())
      curWeight = schedule[i].weight === undefined? defaultWeight : schedule[i].weight
      startTime = new Date(schedule[i].scheduledTime.valueOf() + curWeight * hourVal)
      timeSlots.set(startTime, schedule[i + 1].scheduledTime)
  }
    
    // sort tasks to interleave with duration
    tasks.sort((t1, t2) => {
      let weight1: number = t1.weight === undefined ? defaultWeight : t1.weight
      let weight2: number = t2.weight === undefined ? defaultWeight : t2.weight
      return weight1 - weight2
    })

    // should probably apply some ordering to tasks to be interleaved as well
    // ignoring that for now
    let timeSlotsUpdated: boolean = false
    let taskInserted: boolean
    let newTimeSlots:  Map<Date, Date>;
    let curStart: Date
    let nextTask: DummyTaskModel
    let nextWeight: number
    newTimeSlots = new Map<Date, Date>()
    timeSlots.forEach((value, key, map) => {
      //console.log("time slot: " + key.toLocaleString() + " -> " + value.toLocaleString())
      curStart = key
      for (let i: number = tasks.length - 1; i >= 0; i--) {
        nextWeight = tasks[i].weight === undefined ? defaultWeight : tasks[i].weight
        //console.log("next interleave task requires " + nextWeight + "hours")
        if (value.valueOf() - curStart.valueOf() > nextWeight * hourVal) {
          nextTask = tasks.splice(i, 1)[0]
          nextTask.scheduledTime = curStart
          console.log("scheduling task " + nextTask.name + " at " + nextTask.scheduledTime.toLocaleString())
          // update starting time of time slot
          curStart = new Date(curStart.valueOf() + nextWeight * hourVal)
          //console.log("curStart updated to " + curStart.toLocaleString())
          schedule.push(nextTask)
          //console.log("pushing a new interleave task")
        }
      }
    })
    
    // return schedule containing interleaving tasks
    //console.log("schedule length: " + schedule.length)
    return schedule
  }

  /* shift task start time so that they are finished offset days before due not
    overdue for interleaving. in map returned key = start time
    assuming that a no overdue schedule exists
    assume weight = time needed in hours
    to avoid overlapping of tasks go from right to left, use min(start of 
    current task, due of previous task) as basis of pushing previous task to
    right.
   */
  private pushRight(tasks: DummyTaskModel[]): DummyTaskModel[] {
    let basis: Date = tasks[tasks.length - 1].dueDateTime;
    console.log("basis is set to " + basis)
    let start: Date
    let curWeight: number
    for (let i: number = tasks.length - 1; i > -1; i--) {
      // handle tasks with no weight
      curWeight = tasks[i].weight === undefined ? defaultWeight : tasks[i].weight
      start = new Date(basis.valueOf() - curWeight * hourVal)
      tasks[i].scheduledTime = start
      if (i != 0)
        if (start.valueOf() < tasks[i - 1].dueDateTime.valueOf())
          basis = start;
        else
          basis = tasks[i - 1].dueDateTime;
    }
    let i: number
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
    console.log("length of q4: " + q4.length)
    let interleaveTasks: DummyTaskModel[] 
    interleaveTasks = quadrants.get(2).concat(quadrants.get(4))
    let urgentTasks: DummyTaskModel[]
    urgentTasks = quadrants.get(1).concat(quadrants.get(3))

    // sort urgent tasks by increasing deadline (greedy algorithm)
    urgentTasks.sort((t1, t2) => {
      if (t1.dueDateTime && t2.dueDateTime === undefined)
        return 0
      else if (t1.dueDateTime === undefined)
        return Number.MAX_SAFE_INTEGER
      else if (t1.dueDateTime === undefined)
        return Number.MIN_SAFE_INTEGER
      else
        return t1.dueDateTime.valueOf() - t2.dueDateTime.valueOf()
    })
    
    // remove urgent tasks with no due date
    let noDueNum: number = 0
    let noDues: DummyTaskModel[]
    for (let i: number = urgentTasks.length - 1; i >= 0; i--) {
      if (urgentTasks[i].dueDateTime !== undefined)
        break
      noDueNum++    
    }
    //console.log("removing total of " + noDueNum + " tasks with out duedate")
    noDues = urgentTasks.splice(urgentTasks.length - noDueNum, noDueNum)
    //console.log("total: " + noDues.length + " tasks removed")
    //console.log(noDues[0].name)

    // push tasks to right
    let pushRightSchedule: DummyTaskModel[] = this.pushRight(urgentTasks)
    console.log("after push right: " + pushRightSchedule.length)
    // make sure urgent tasks with no due date are the first to be interleaved
    //interleaveTasks = noDues.concat(interleaveTasks)

    //return Observable.of(this.interleave(this.pushRight(this.sortTasks(urgentTasks)), interleaveTasks))
    let urgentInt: DummyTaskModel[] = this.interleave(pushRightSchedule, noDues)
    console.log("urgentInt length: " + urgentInt.length)
    console.log("length of q2 " + q2.length)
    let addq2: DummyTaskModel[] = this.interleave(urgentInt, q2)
    console.log("after adding q2 " + addq2.length)
    let addq4: DummyTaskModel[] = this.interleave(addq2, q4)
    console.log("after adding q4 " + addq4.length)
    return Observable.of(addq4)
  }
}
