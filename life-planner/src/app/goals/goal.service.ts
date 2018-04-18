import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from '../core/auth.service';
import {Observable} from 'rxjs/Observable';
import {GoalModel} from './goal.model';
import {ProjectService} from '../projects/project.service';

@Injectable()
export class GoalService {

  goalsRef: AngularFirestoreCollection<GoalModel>;
  goalDoc: AngularFirestoreDocument<GoalModel>;
  goals: Observable<GoalModel[]>;
  singleGoal: Observable<GoalModel>;

  constructor(private db: AngularFirestore , private ps: ProjectService) {
    if (AuthService.isLoggedIn()) {
      console.log('User ID: ' + AuthService.currentUserId());
      this.goalsRef = this.db.collection('users').doc(AuthService.currentUserId()).collection('goals');
      this.goals = this.goalsRef.valueChanges();
    } else {
      // redirect to login screen please //
      console.log('Why are you here? Who are you?');
    }
  }

  addGoal(goal: GoalModel, pid?: string) {
    // this.db.collection('finishedExercises').add(event);
    goal.createdAt = new Date();
    this.goalsRef.add(goal)
      .then(item => {
        if (pid !== undefined) {
          this.ps.addEventToProject(pid, item.id);
        }
      })
      .catch(function() {
        console.log('Error Adding');
      });

  }

  getGoal(gid: string): Observable<GoalModel> {
    this.goalDoc = this.goalsRef.doc(gid);

    console.log('GS: ref lookup ' + this.goalDoc.ref.id);
    this.singleGoal = this.goalDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        console.log('GS: goal NOT found for gid: ' + gid);
        return null;
      } else {
        const data = action.payload.data() as GoalModel;
        data.gid = action.payload.id;
        console.log('GS: goal FOUND for gid: ' + gid);
        return data;
      }
    });

    return this.singleGoal;
  }
  /*
  findGoals(list: string[] = []): Observable<GoalModel[]> {
    return this.getGoals().map(fgoals => fgoals.filter(fgoal => list.includes(fgoal.gid) ));
  }*/
  getGoals(): Observable<GoalModel[]> {
    this.goals = this.goalsRef.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as GoalModel;
        data.gid = action.payload.doc.id;
        return data;
      });
    });
    return this.goals;
  }

  updateGoal(goal: GoalModel) {
    goal.updatedAt = new Date();

    this.goalDoc = this.goalsRef.doc(goal.gid);
    this.goalDoc.update(goal);
  }

  deleteGoal(goal: GoalModel) {
    this.goalDoc = this.goalsRef.doc(goal.gid);
    this.goalDoc.delete();
  }

}
