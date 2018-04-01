import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from '../core/auth.service';
import {Observable} from 'rxjs/Observable';
import {TaskModel, TaskWeight} from './task.model';


@Injectable()
export class TaskService {

  tasksRef: AngularFirestoreCollection<TaskModel>;
  taskDoc: AngularFirestoreDocument<TaskModel>;
  tasks: Observable<TaskModel[]>;
  singleTask: Observable<TaskModel>;

  constructor(private db: AngularFirestore) {
    if (AuthService.isLoggedIn()) {
      console.log('User ID: ' + AuthService.currentUserId());
      this.tasksRef = this.db.collection('users').doc(AuthService.currentUserId()).collection('tasks');
      this.tasks = this.tasksRef.valueChanges();
    } else {
      // redirect to login screen please //
      console.log('Why are you here? Who are you?');
    }
  }

  addTask(task: TaskModel) {
    // this.db.collection('finishedExercises').add(task);
    task.createdAt = new Date();
    this.tasksRef.add(task);
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
    this.taskDoc.delete();
  }



}

