import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

// internal value of an hour
const hourVal: number = 
  new Date(2018, 3, 8, 10).valueOf() - new Date(2018, 3, 8, 9).valueOf()

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
    name: "length-22-interleave",
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
    
    // find time slots available for interleaving
    // start and end of each time slot
    let timeSlots: Map<Date, Date> = new Map<Date, Date>();
    for (let i: number = 0; i < schedule.length - 1; i++)
      timeSlots.set(schedule[i].dueDateTime, schedule[i + 1].scheduledTime)
  
    // sort tasks to interleave with duration
    tasks.sort((t1, t2) => {
      return t1.weight - t2.weight
    })

    // should probably apply some ordering to tasks to be interleaved as well
    // ignoring that for now
    let timeSlotsUpdated: boolean = false
    let taskInserted: boolean
    let newTimeSlots:  Map<Date, Date>;
    let curStart: Date
    let nextTask: DummyTaskModel
    newTimeSlots = new Map<Date, Date>()
    timeSlots.forEach((value, key, map) => {
      console.log("time slot: " + key.toLocaleString() + " -> " + value.toLocaleString())
      curStart = key
      for (let i: number = tasks.length - 1; i >= 0; i--) {
        console.log("next interleave task requires " + tasks[i].weight + "hours")
        if (value.valueOf() - curStart.valueOf() > tasks[i].weight * hourVal) {
          nextTask = tasks.splice(i, 1)[0]
          nextTask.scheduledTime = curStart
          console.log("next task scheduled at: " + curStart.toLocaleString())
          // update starting time of time slot
          curStart = new Date(curStart.valueOf() + nextTask.weight * hourVal)
          console.log("curStart updated to " + curStart.toLocaleString())
          // remove task from list of interleaving tasks
          
          // put interleave task into final schedule
          schedule.push(nextTask)
          console.log("pushing a new interleave task")
        }
      }
    })
    
    // return schedule containing interleaving tasks
    console.log("schedule length: " + schedule.length)
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
    let start: Date;
    for (let i: number = tasks.length - 1; i > -1; i--) {
      start = new Date(basis.valueOf() - tasks[i].weight * hourVal)
      tasks[i].scheduledTime = start
      // still have more tasks
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
    let q1: DummyTaskModel[] = [];
    let q2: DummyTaskModel[] = [];
    let q3: DummyTaskModel[] = [];
    let q4: DummyTaskModel[] = [];

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
    let quadrants: Map<number, DummyTaskModel[]> = this.filter(dummyTasks)
    let q1: DummyTaskModel[] = [];
    let q2: DummyTaskModel[] = [];
    let q3: DummyTaskModel[] = [];
    let q4: DummyTaskModel[] = [];
    let interleaveTasks = quadrants.get(2).concat(quadrants.get(4))
    let urgentTasks = quadrants.get(1).concat(quadrants.get(3))
    // sort urgent tasks by increasing deadline (greedy algorithm)
    urgentTasks.sort((t1, t2) => {
      return t1.dueDateTime.valueOf() - t2.dueDateTime.valueOf()
    })
    //return Observable.of(this.interleave(this.pushRight(this.sortTasks(urgentTasks)), interleaveTasks))
    return Observable.of(this.interleave(this.pushRight(urgentTasks), interleaveTasks))
  } 
}
