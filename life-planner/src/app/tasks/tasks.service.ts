import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import {TaskModel} from './task.model';
import {User} from '../core/user.model';
import {AuthService} from '../core/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TasksService {
  private tasksCollection: AngularFirestoreCollection<TaskModel>;
 // private tasks: Observable<TaskModel[]>;
  private userDoc: AngularFirestoreDocument<User>;
  private singleTask: TaskModel;

  constructor(private db: AngularFirestore) {
    if (AuthService.isLoggedIn()) {

      console.log(AuthService.currentUserId());
      db.collection('users').auditTrail().subscribe(console.log);
      this.userDoc = db.doc<User>('users/' + AuthService.currentUserId());
      console.log('inside constructor');
    } else {
      // redirect to login screen please //
      console.log('Why are you here? Who are you?');
    }
  }

  addTask(task: TaskModel) {
    // this.db.collection('finishedExercises').add(task);
    this.userDoc.collection('tasks').add(task)
      .then(() => {
        console.log('Done adding task');
      })
      .catch(
        error => console.log(error)
      );
  }

  getTask() {
    return { ...this.singleTask };
  }
  getTasks() {
    // return this.afs.collection('students', ref => ref.orderBy('studentAge')).valueChanges();
    this.tasksCollection = this.userDoc.collection('tasks');

    return this.tasksCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as TaskModel;
        data.tid = a.payload.doc.id;
        return data;
      });
    });
  }

}
