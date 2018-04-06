import { Component, OnInit } from '@angular/core';
import { SchedulingService } from '../core/scheduling.service';
import { DummyTaskModel } from '../core/scheduling.service';
import { TasksModule } from '../tasks/tasks.module';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  tasks: DummyTaskModel[]
  
  constructor(private schedulingService: SchedulingService) { }

  ngOnInit() {
  }

  getSchedule() {
    this.tasks = this.schedulingService.createSchedule();
  }
}
