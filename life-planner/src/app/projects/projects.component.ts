import { Component, OnInit } from '@angular/core';
import { JsonConvert } from "json2typescript";
import { Project } from "../jsonTemplates/project";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  title = "Q2:Projects";
  projs: Project[];
  projName: String;
  projDescription: String;

  constructor() {
  }

  ngOnInit() {
    this.projs = this.projectsFromDatabase();
  }

  projectsFromDatabase(){
    let tempJson: object = [
        {
          "name":"Test One",
          "description":"This is the description for test one!"
        },
        {
          "name":"Test Two",
          "description":"This is the description for test two!"
        }
      ];
    let jconvert: JsonConvert = new JsonConvert();
    return jconvert.deserialize(tempJson,Project);

  }

  // Would need to connect to db to store info in db instead.
  createProject(name: String, description: String){
    let jconvert: JsonConvert = new JsonConvert();
    this.projs[this.projs.length] = jconvert.deserialize({"name":name,"description":description},Project);
    // Save to database too
  }
}
