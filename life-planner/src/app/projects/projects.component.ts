import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

  static projectsFromDatabase(){
    ProjectsComponent.newProjectCard("From Database");
  }

  static newProjectFromForm(){
    const projName = (<HTMLInputElement>document.getElementById('project_new_name')).value;
    const form = (<HTMLFormElement>document.getElementById('project_create_form'));
    ProjectsComponent.newProjectCard(projName);
    form.reset();
    return false;
  }

  static newProjectCard(projName) {
    const projList = document.getElementById('project_list');
    const projNewCard = '<div class=\"col s12 m6 l4\">\n' +
                        '    <div class=\"card blue darken-1\">\n' +
                        '      <div class=\"card-content white-text\">\n' +
                        '        <span class=\"card-title\">' + projName + '</span>\n' +
                        '      </div>\n' +
                        '    </div>\n' +
                        ' </div>';
    projList.innerHTML = projList.innerHTML + projNewCard;
  }

}
