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

  newProject() {
    console.log('hello clarice');
    const projList = document.getElementById('project_list');
    var projName = (<HTMLInputElement>document.getElementById('project_new_name'));
    const projNewCard = '<div class=\"col s12 m6 l4\">\n' +
                        '    <div class=\"card blue darken-1\">\n' +
                        '      <div class=\"card-content white-text\">\n' +
                        '        <span class=\"card-title\">' + projName.value + '</span>\n' +
                        '      </div>\n' +
                        '    </div>\n' +
                        ' </div>';
    projList.innerHTML = projList.innerHTML + projNewCard;
    projName.innerText = "";
    return false;
  }

}
