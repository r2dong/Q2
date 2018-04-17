import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {RoleService} from '../role.service';
import {RoleModel} from '../role.model';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Location} from '@angular/common';
import {TaskModel} from '../../tasks/task.model';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {TaskService} from '../../tasks/task.service';

@Component({
  selector: 'app-select-roles',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.css']
})

export class SelectRoleComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<boolean> = new Subject();

  @Input() roles: RoleModel[];
  @Input() tid: string;

  private allRoles: RoleModel[];
  private singleTask: TaskModel;

  constructor(
    private roleService: RoleService,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.tid = this.route.snapshot.params['tid'];

    console.log('current tid: ' + this.tid);
    if (this.tid !== undefined) {

      this.taskService.getTask(this.tid)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(task => {
          if (task.tid !== undefined) {
            console.log('task found for tid: ' + this.tid);
            this.singleTask = task;

            this.roleService.getRoles()
              .subscribe(roles => {
                console.log('select-role (no filter):: found ' + roles.length.toString() + ' roles for tid: ' + this.tid);
                this.allRoles = roles;

                console.log('before loop');
                for (const sRole of this.allRoles) {
                  console.log('for rid: ' + sRole.rid + ' the this.tid is: ' + this.tid); // 1, "string", false
                }
              });


            this.roleService.getRoles()
              .map(epics => epics.filter(epic => epic.rid !== this.tid))
              .subscribe(roles => {
                console.log('select-role:: found ' + roles.length.toString() + ' roles for tid: ' + this.tid);
                this.roles = roles;
              });


          }
        });
    }

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onAddClick(role: RoleModel) {
    console.log('select-role: onAddClick starting tid: ' + this.tid + ' selected role: ' + role.rid);
    this.roleService.addRoleToTask(this.tid, role);
    this.flashMessage.show('Role added to this task', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.goBack();
  }

  goBack() {

    this.location.back();
  }

}
