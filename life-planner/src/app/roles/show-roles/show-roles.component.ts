import {Component, Input, OnInit} from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {RoleService} from '../role.service';
import {RoleModel} from '../role.model';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {TaskService} from '../../tasks/task.service';

@Component({
  selector: 'app-show-roles',
  templateUrl: './show-roles.component.html',
  styleUrls: ['./show-roles.component.css']
})

export class ShowRolesComponent implements OnInit {
  @Input() roles: RoleModel[];
  @Input() tid: string;

  constructor(
    private roleService: RoleService,
    private taskService: TaskService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private location: Location,
  ) {
  }

  ngOnInit() {
    if (this.router.url === '/roles/show-roles') {
      this.roleService.getRoles().subscribe(roles => {
        this.roles = roles;
      });
      this.tid = undefined;
    }
  }

  onRemoveClick(role: RoleModel) {
    if (confirm('Remove role from this project?')) {
      console.log('show-roles for role.rid: ' + role.rid);

      this.taskService.removeRoleFromTask(this.tid, role.rid);
      this.flashMessage.show('Role removed from this task', {
        cssClass: 'alert-success', timeout: 4000
      });
    }
  }

  onDeleteClick(role: RoleModel) {
    if (confirm('Permanently delete role from the system?')) {
      this.roleService.deleteRole(role);
      this.flashMessage.show('Role deleted', {
        cssClass: 'alert-success', timeout: 4000
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
