import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProjectModel } from '../project.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  pid: string;
  project: ProjectModel;

  constructor(private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.pid = this.route.snapshot.params['pid'];
    // Get client
    this.projectService.getProject(this.pid).subscribe(project => {
      if (project != null) {
        console.log('project found for pid: ' + this.pid);
      }
      this.project = project;
    });
  }

  onSubmit({value, valid}: {value: ProjectModel, valid: boolean}) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add id to client
      value.pid = this.pid;
      value.createdAt = this.project.createdAt;
      // Update client
      this.projectService.updateProject(value);
      this.flashMessage.show('Project updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/projects/' + this.pid]);
    }
  }

}
