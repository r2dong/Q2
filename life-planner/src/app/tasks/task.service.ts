import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from '../core/auth.service';
import {Observable} from 'rxjs/Observable';
import {TaskModel, TaskWeight} from './task.model';
import {ProjectService} from '../projects/project.service';


@Injectable()
export class TaskService {

  tasksRef: AngularFirestoreCollection<TaskModel>;
  taskDoc: AngularFirestoreDocument<TaskModel>;
  tasks: Observable<TaskModel[]>;
  singleTask: Observable<TaskModel>;

  constructor(private db: AngularFirestore, private ps: ProjectService) {
    if (AuthService.isLoggedIn()) {
      console.log('User ID: ' + AuthService.currentUserId());
      this.tasksRef = this.db.collection('users').doc(AuthService.currentUserId()).collection('tasks');
      this.tasks = this.tasksRef.valueChanges();
    } else {
      // redirect to login screen please //
      console.log('Why are you here? Who are you?');
    }
  }

  addTask(task: TaskModel, pid?: string) {
    // this.db.collection('finishedExercises').add(task);
    task.createdAt = new Date();
    if ( pid !== undefined ) { task.pid = pid; }
    this.tasksRef.add(task)
      .then( item => {
        if ( pid !== undefined ) { this.ps.addTaskToProject(pid, item.id); }
      })
      .catch(function() { console.log('Error adding'); } );
  }

  getTask(tid: string): Observable<TaskModel> {
    this.taskDoc = this.tasksRef.doc(tid);

    console.log('TS: ref lookup ' + this.taskDoc.ref.id);
    this.singleTask = this.taskDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        console.log('TS: task NOT found for tid: ' + tid);
        return null;
      } else {
        const data = action.payload.data() as TaskModel;
        data.tid = action.payload.id;
        console.log('TS: task FOUND for tid: ' + tid);
        return data;
      }
    });

    return this.singleTask;
  }

  findTasks(list: string[] = []): Observable<TaskModel[]> {
    this.tasks = this.getTasks().map(epics => epics.filter(epic => list.includes(epic.tid) ));
    return this.tasks;
  }

  getTasks(): Observable<TaskModel[]> {
    this.tasks = this.tasksRef.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as TaskModel;
        data.tid = action.payload.doc.id;
        return data;
      });
    });
    return this.tasks;
  }

  updateTask(task: TaskModel) {
    task.updatedAt = new Date();
    this.taskDoc = this.tasksRef.doc(task.tid);
    this.taskDoc.update(task);
  }

  deleteTask(task: TaskModel) {
    this.taskDoc = this.tasksRef.doc(task.tid);
    if ( task.pid !== undefined ) { this.ps.removeTaskFromProject(task.pid, task.tid); }
    this.taskDoc.delete();
  }



}

