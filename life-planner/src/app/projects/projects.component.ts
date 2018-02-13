import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  newProject() {
    console.log('hello clarice');
    const projList = document.getElementById('project_list');
    const projName = (<HTMLInputElement>document.getElementById('project_new_name')).value;
    const projNewCard = '<div class=\"col s12 m6 l4\">\n' +
                        '    <div class=\"card blue darken-1\">\n' +
                        '      <div class=\"card-content white-text\">\n' +
                        '        <span class=\"card-title\">' + projName + '</span>\n' +
                        '      </div>\n' +
                        '    </div>\n' +
                        ' </div>';
    const projCardNode = document.createTextNode(projNewCard);
    projList.appendChild(projCardNode);
  }

}
