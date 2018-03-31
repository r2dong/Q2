import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from '../core/auth.service';
import {Observable} from 'rxjs/Observable';
import {ProjectModel} from './Project.model';
import 'rxjs/add/operator/takeUntil';


@Injectable()
export class ProjectService {

  projectsRef: AngularFirestoreCollection<ProjectModel>;
  projectDoc: AngularFirestoreDocument<ProjectModel>;
  projects: Observable<ProjectModel[]>;
  singleProject: Observable<ProjectModel>;

  constructor(private db: AngularFirestore) {
    if (AuthService.isLoggedIn()) {
      console.log('User ID: ' + AuthService.currentUserId());
      this.projectsRef = this.db.collection('users').doc(AuthService.currentUserId()).collection('projects');
      this.projects = this.projectsRef.valueChanges();
    } else {
      // redirect to login screen please //
      console.log('Why are you here? Who are you?');
    }
  }

  addProject(project: ProjectModel) {
    // this.db.collection('finishedExercises').add(project);
    project.createdAt = new Date();
    this.projectsRef.add(project);
  }

  getProject(pid: string): Observable<ProjectModel> {
    this.projectDoc = this.projectsRef.doc(pid);

    console.log('PS: ref lookup ' + this.projectDoc.ref.id);
    this.singleProject = this.projectDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        console.log('PS: project NOT found for pid: ' + pid);
        return null;
      } else {
        const data = action.payload.data() as ProjectModel;
        data.pid = action.payload.id;
        console.log('PS: project FOUND for pid: ' + pid);
        return data;
      }
    });

    return this.singleProject;
  }
  getProjects(): Observable<ProjectModel[]> {
    this.projects = this.projectsRef.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ProjectModel;
        data.pid = action.payload.doc.id;
        return data;
      });
    });
    return this.projects;
  }

  updateProject(project: ProjectModel) {
    project.updatedAt = new Date();

    this.projectDoc = this.projectsRef.doc(project.pid);
    this.projectDoc.update(project);
  }

  deleteProject(project: ProjectModel) {
    this.projectDoc = this.projectsRef.doc(project.pid);
    this.projectDoc.delete();
  }

  addTaskToProject(pid: string, tid: string){
    this.getProject(pid).take(1).forEach(proj => {
      if(proj.tids === undefined){
        proj.tids = [];
      }
      if(!proj.tids.includes(tid)){
        proj.tids.push(tid);
        this.updateProject(proj);
      }
    });
  }
  removeTaskFromProject(pid: string, tid: string){
    this.getProject(pid).take(1).forEach(proj => {
      if(proj.tids === undefined){
        proj.tids = [];
      }
      const index = proj.tids.indexOf(tid);
      if(index !== -1){
        proj.tids.splice(index,1);
        this.updateProject(proj);
      }
    });
  }
}

