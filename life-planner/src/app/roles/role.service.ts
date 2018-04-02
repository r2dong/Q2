import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from '../core/auth.service';
import {Observable} from 'rxjs/Observable';
import {RoleModel} from './role.model';
import {ProjectService} from '../projects/project.service';


@Injectable()
export class RoleService {

  rolesRef: AngularFirestoreCollection<RoleModel>;
  roleDoc: AngularFirestoreDocument<RoleModel>;
  roles: Observable<RoleModel[]>;
  singleRole: Observable<RoleModel>;

  constructor(private db: AngularFirestore, private ps: ProjectService) {
    if (AuthService.isLoggedIn()) {
      console.log('User ID: ' + AuthService.currentUserId());
      this.rolesRef = this.db.collection('users').doc(AuthService.currentUserId()).collection('roles');
      this.roles = this.rolesRef.valueChanges();
    } else {
      // redirect to login screen please //
      console.log('Why are you here? Who are you?');
    }
  }

  addRole(role: RoleModel, pid?: string) {
    // this.db.collection('finishedExercises').add(role);
    role.createdAt = new Date();
    if ( pid !== undefined ) { role.pid = pid; }
    this.rolesRef.add(role)
      .then( item => {
        if ( pid !== undefined ) { this.ps.addRoleToProject(pid, item.id); }
      })
      .catch(function() { console.log('Error adding'); } );
  }

  getRole(tid: string): Observable<RoleModel> {
    this.roleDoc = this.rolesRef.doc(tid);

    console.log('TS: ref lookup ' + this.roleDoc.ref.id);
    this.singleRole = this.roleDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        console.log('TS: role NOT found for tid: ' + tid);
        return null;
      } else {
        const data = action.payload.data() as RoleModel;
        data.tid = action.payload.id;
        console.log('TS: role FOUND for tid: ' + tid);
        return data;
      }
    });

    return this.singleRole;
  }

  findRoles(list: string[] = []): Observable<RoleModel[]> {
    this.roles = this.getRoles().map(epics => epics.filter(epic => list.includes(epic.tid) ));
    return this.roles;
  }

  getRoles(): Observable<RoleModel[]> {
    this.roles = this.rolesRef.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as RoleModel;
        data.tid = action.payload.doc.id;
        return data;
      });
    });
    return this.roles;
  }

  updateRole(role: RoleModel) {
    role.updatedAt = new Date();
    this.roleDoc = this.rolesRef.doc(role.tid);
    this.roleDoc.update(role);
  }

  deleteRole(role: RoleModel) {
    this.roleDoc = this.rolesRef.doc(role.tid);
    if ( role.pid !== undefined ) { this.ps.removeRoleFromProject(role.pid, role.tid); }
    this.roleDoc.delete();
  }



}

