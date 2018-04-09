import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// stubbing interface, use imported interface when actual one completed
export interface DummyTaskModel {
  name: string;
  urgent: boolean;
  important: boolean;
  dueDateTime?: Date;
  isComplete: boolean;
  weight?: number;
}

// dummy tasks for testing algorithms
// year month day hour minute second millisecond
const dummyTasks: DummyTaskModel[] = [
  {
    name: "rob a bank",
    urgent: true,
    important: true,
    dueDateTime: new Date(2018, 3, 7, 9, 26),
    isComplete: false,
    weight: 10
  },
  {
    name: "pass this course",
    urgent: false,
    important: false,
    dueDateTime: new Date(2018, 3, 8, 9, 26),
    isComplete: false,
    weight: 6
  },
  {
    name: "go to the gym",
    urgent: true,
    important: false,
    dueDateTime: new Date(2018, 3, 5, 9, 26),
    isComplete: false,
    weight: 5
  },
  {
    name: "eat tacos",
    urgent: false,
    important: true,
    dueDateTime: new Date(2018, 3, 4, 9, 26),
    isComplete: false,
    weight: 1
  },
]

@Injectable()
export class SchedulingService {

  currentDate: Date;

  constructor() {}

  // insertion sort in increasing deadline (greedy algorithm)
  private sortTasks(tasks: DummyTaskModel[]): DummyTaskModel[] {
    let toReturn: DummyTaskModel[] = []
    toReturn.push(tasks[0])
    for (let i: number = 1; i < tasks.length; i++) {
      if (tasks[i].dueDateTime < toReturn[0].dueDateTime) {
        toReturn.splice(0, 0, tasks[i])
        continue
      }
      else if (tasks[i].dueDateTime > 
        toReturn[toReturn.length - 1].dueDateTime) {
        toReturn.push(tasks[i])
        continue
      }
      for (let j: number = 0; j < toReturn.length - 1; j++) {
        if (tasks[i].dueDateTime >= toReturn[j].dueDateTime &&
            tasks[i].dueDateTime <= toReturn[j+1].dueDateTime) {
          toReturn.splice(j + 1, 0, tasks[i])
          break
        }
      }
    }
    return toReturn
  }

  private updateCurrentTime() {
    this.currentDate = new Date(Date.now());
    console.log("Updated current date to: " + this.currentDate.getDate());
    console.log("Updated current Month to: " + this.currentDate.getMonth());
  }

    //constructor(private taskService: TaskService) {}
  
  //createScheduleObWrapper() {
  //  this.taskService.getTasks().subscribe(tasks => {});
  //}

  createSchedule(): DummyTaskModel[] {
    return this.sortTasks(dummyTasks)
  }
  
  /* complete all urgent tasks first, then interleave between non
  urgent ones */
  naiveSchedule(): DummyTaskModel[] {

    this.updateCurrentTime();

    let tasks: DummyTaskModel[] = dummyTasks;
    /* probably go back to 3330 for scheduling algorithms for all urgent
    tasks, the work around extra time with remaining time */
    let schedule: DummyTaskModel[] = [];
    let q1: DummyTaskModel[] = [];
    let q2: DummyTaskModel[] = [];
    let q3: DummyTaskModel[] = [];
    let q4: DummyTaskModel[] = [];
    let deadlyUrgent: DummyTaskModel[] = []; // finish everything here before interleaving
    
    // characterize all tasks
    for (let i: number = 0; i < tasks.length; i++) {
      if (tasks[i].urgent && tasks[i].important) {
        q1.push(tasks[i]);
        console.log("pushing " + tasks[i].name + " to q1");
      }
      else if (tasks[i].urgent && !tasks[i].important)
        q3.push(tasks[i]);
      else if (!tasks[i].urgent && tasks[i].important)
        q2.push(tasks[i]);
      else if (!tasks[i].urgent && !tasks[i].important)
        q4.push(tasks[i]);
    }

    // complete all urgent stuff and then interleave
    for (let i: number = 0; i < q1.length; i++)
      schedule.push(q1[i]);
    for (let i: number = 0; i < q3.length; i++)
      schedule.push(q3[i]);
    // interleave
    let i2: number = 0;
    let i4: number = 0;
    let inter: number = 0;
    while (i2 < q2.length && i4 < q2.length)
      if (inter % 2 == 0)
        schedule.push(q2[i2++]);
      else
        schedule.push(q4[i4++]);
    for (i2; i2 < q2.length; i2++)
      schedule.push(q2[i2++]);
    for (i4; i4 < q4.length; i4++)
      schedule.push(q4[i4++]); 
    return schedule;
  }
}
