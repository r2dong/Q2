import { Component, OnInit } from '@angular/core';
import { SchedulingService } from '../core/scheduling.service';
import { DummyTaskModel } from '../core/scheduling.service';
import { TasksModule } from '../tasks/tasks.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  private schedule: DummyTaskModel[]
  // manualy split as ngFor cannot handle Maps
  // private times: Date[]
  // private tasks: DummyTaskModel[]
  
  constructor(private schedulingService: SchedulingService) { }

  ngOnInit() {}

  getSchedule() {
    let s: Observable<DummyTaskModel[]> = this.schedulingService.createSchedule();
    s.subscribe(p => {
      this.schedule = p
      for (let i: number = 0; i < p.length; i++) {
        console.log(i)
        console.log(this.schedule[i].name)
        console.log(this.schedule[i].dueDateTime)
        console.log()
      }
    })
    
    
    /*
    // update splitting of schedule
    this.times = []
    this.tasks = []
    let curTime: Date
    for (var time in this.schedule) {
      curTime = new Date(time)
      this.times.push(curTime)
      this.tasks.push(this.schedule.get(curTime))
    } 
    */
  }
}
