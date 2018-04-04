import { Component, OnInit } from '@angular/core';
import {ProjectService} from './project.service';
import {ProjectModel} from './project.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {
  projects: ProjectModel[];

  constructor(private ps: ProjectService, private router: Router) { }


  ngOnInit() {
     this.ps.getProjects().subscribe(projects => {
       this.projects = projects;
     });
  }


}
