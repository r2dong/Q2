import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {TaskService} from '../task.service';
import {TaskModel} from '../task.model';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Location} from '@angular/common';
import {ProjectService} from '../../projects/project.service';
import {ProjectModel} from '../../projects/project.model';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-select-tasks',
  templateUrl: './select-task.component.html',
  styleUrls: ['./select-task.component.css']
})

export class SelectTaskComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<boolean> = new Subject();

  @Input() tasks: TaskModel[];
  @Input() pid: string;

  private allTasks: TaskModel[];
  private singleProject: ProjectModel;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.pid = this.route.snapshot.params['pid'];

    console.log('current pid: ' + this.pid);
    if (this.pid !== undefined) {

       this.projectService.getProject(this.pid)
         .takeUntil(this.ngUnsubscribe)
         .subscribe(project => {
        if (project.pid !== undefined) {
          console.log('project found for pid: ' + this.pid);
          this.singleProject = project;

          this.taskService.getTasks()
            .subscribe(tasks => {
              console.log('select-task (no filter):: found ' + tasks.length.toString() + ' tasks for pid: ' + this.pid);
              this.allTasks = tasks;

              console.log('before loop');
              for (const sTask of this.allTasks) {
                console.log('for tid: ' + sTask.tid + ' the sTask.pid is: ' + sTask.pid); // 1, "string", false
              }
            });


          this.taskService.getTasks()
            .map(epics => epics.filter(epic => epic.pid === undefined || epic.pid.length === 0))
            .subscribe(tasks => {
              console.log('select-task:: found ' + tasks.length.toString() + ' tasks for pid: ' + this.pid);
              this.tasks = tasks;
            });


        }
      });
    }

  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onAddClick(task: TaskModel) {
    console.log('select-task: onAddClick starting pid: ' + this.pid + ' selected task: ' + task.tid);
    this.taskService.addTaskToProject(this.pid, task);
    this.flashMessage.show('Task added to this project', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.goBack();
  }

  goBack() {

    this.location.back();
  }

}
