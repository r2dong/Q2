import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {TaskService} from '../task.service';
import {TaskModel} from '../task.model';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Location} from '@angular/common';
import {ProjectService} from '../../projects/project.service';
import {ProjectModel} from '../../projects/project.model';

@Component({
  selector: 'app-select-tasks',
  templateUrl: './select-task.component.html',
  styleUrls: ['./select-task.component.css']
})

export class SelectTaskComponent implements OnInit {
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

      const projectSubscription = this.projectService.getProject(this.pid).subscribe(project => {
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
        projectSubscription.unsubscribe();
      });
      projectSubscription.unsubscribe();

    }

  }

  onAddClick(task: TaskModel) {
    this.projectService.addTaskToProject(this.pid, task.tid);
    this.flashMessage.show('Task added to this project', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.goBack();
  }

  goBack() {

    this.location.back();
  }

}
