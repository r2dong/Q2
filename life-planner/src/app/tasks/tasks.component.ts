import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from '../core/auth.service';
import {Observable} from 'rxjs/Observable';

import {TaskModel, TaskWeight} from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

/*
 id: string;
//  rid?: Role.id;
  name: string;
  urgent: boolean;
  important: boolean;
  dueDateTime?: Date;
  isComplete: boolean;
  weight: TaskWeight;
//  tagIDs?: string[];
  createdOn?: Date;

 */
export class TasksComponent implements OnInit {

  private tasksRef: AngularFirestoreCollection<TaskModel>;
  public tasks: Observable<TaskModel[]>;
  public selectedTask: TaskModel;


  toggleTaskUpdate (value: boolean) {
    (<HTMLInputElement>document.getElementById('task_update_name')).disabled = value;
    (<HTMLInputElement>document.getElementById('task_update_duedate')).disabled = value;
    (<HTMLInputElement>document.getElementById('task_update_name_s')).disabled = value;
    (<HTMLInputElement>document.getElementById('task_update_duedate_s')).disabled = value;
  }


  constructor(public db: AngularFirestore) {
    this.tasksRef = this.db.collection('users').doc(AuthService.currentUserId()).collection('tasks');
    this.tasks = this.tasksRef.valueChanges();
  }


  ngOnInit() {
  }

  createTask(name: string, rid?: string, due_datetime?: string ): Promise<boolean> {
    const temtid = this.db.createId();
    const task: TaskModel = { tid: temtid, name: name };
    if (rid) { task.rid = rid; }
    if (due_datetime) { task.dueDateTime = due_datetime; }
    return this.tasksRef.doc(temtid).set(task)
      .then( function() { return true; } )
      .catch( function() { return false; } );
  }

  readTask(tid: string): Promise<TaskModel> | null {
    const task: Promise<TaskModel> =  this.tasksRef.doc(tid).ref.get()
      .then( function(doc) {
        if (doc.exists) {
          return doc.data() as TaskModel;
        } else {
          return null;
        }
      }).catch(function(error) {
        return null;
      });
    return task.then(ref => {
      console.log(ref);
      return ref;
    });
  }

  updateTask(tid: string, name: string, rid?: string, due_datetime?: string): Promise<boolean> {
    const task: TaskModel = { tid: tid, name: name, dueDateTime: due_datetime };
    if (rid) { task.rid = rid; }
    if (due_datetime) { task.dueDateTime = due_datetime; }
    return this.tasksRef.doc(tid).update(task)
      .then( function() { return true; } )
      .catch( function() { return false; } );
  }

  deleteTask(tid: string): Promise<boolean>  {
    return this.tasksRef.doc(tid).delete()
      .then( function() { return true; } )
      .catch( function() { return false; } );
  }

}
