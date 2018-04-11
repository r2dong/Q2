import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProjectModel } from '../project.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  project: ProjectModel = {
    pid: '',
    name: '',
    dueDateTime: ''
  };

  @ViewChild('projectForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private projectService: ProjectService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: ProjectModel, valid: boolean}) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add new client
      this.projectService.addProject(value);
      // Show message
      this.flashMessage.show('New project added', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to dash
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }

}
