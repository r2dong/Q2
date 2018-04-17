import {Component, OnInit, Pipe} from '@angular/core';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {TaskModel} from '../task.model';
import {Location} from '@angular/common';
import {RoleService} from '../../roles/role.service';
import {RoleModel} from '../../roles/role.model';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})

export class TaskDetailComponent implements OnInit {
  tid: string;
  task: TaskModel;
  taskRoles: RoleModel[];


  constructor(
    private taskService: TaskService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private location: Location,
  ) {
  }

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
      const rids = [];
      rids.push(task.rid);
      this.roleService.findRoles(rids).subscribe(roles => {
        console.log('TDC: ngOnInit: found ' + roles.length.toString() + ' roles for tid: ' + this.task.tid);
        this.taskRoles = roles;
      });
    });
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.taskService.deleteTask(this.task);
      this.flashMessage.show('Task removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }

}
