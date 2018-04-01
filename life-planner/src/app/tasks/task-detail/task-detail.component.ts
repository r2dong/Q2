import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TaskModel } from '../task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  tid: string;
  task: TaskModel;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from url
    this.tid = this.route.snapshot.params['tid'];
    // Get task
    console.log('getting tid: ' + this.tid);
    this.taskService.getTask(this.tid).subscribe(task => {
      if (task != null) {
        console.log('task found for tid: ' + this.tid);
      }
      this.task = task;
    });
  }


  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.taskService.deleteTask(this.task);
      this.flashMessage.show('Task removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/home']);
    }
  }
/*
  goBack(): void {
    this.location.back();
  }
  */

}
