import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from '../core/auth.service';
import {Observable} from 'rxjs/Observable';
import {RoleModel} from './role.model';


@Injectable()
export class RoleService {

  rolesRef: AngularFirestoreCollection<RoleModel>;
  roleDoc: AngularFirestoreDocument<RoleModel>;
  roles: Observable<RoleModel[]>;
  singleRole: Observable<RoleModel>;

  constructor(private db: AngularFirestore) {
    if (AuthService.isLoggedIn()) {
      console.log('User ID: ' + AuthService.currentUserId());
      this.rolesRef = this.db.collection('users').doc(AuthService.currentUserId()).collection('roles');
      this.roles = this.rolesRef.valueChanges();
    } else {
      // redirect to login screen please //
      console.log('Why are you here? Who are you?');
    }
  }

  addRole(role: RoleModel) {
    // this.db.collection('finishedExercises').add(role);
    role.createdAt = new Date();
    this.rolesRef.add(role);
  }

  getRole(rid: string): Observable<RoleModel> {
    this.roleDoc = this.rolesRef.doc(rid);

    console.log('TS: ref lookup ' + this.roleDoc.ref.id);
    this.singleRole = this.roleDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        console.log('TS: role NOT found for rid: ' + rid);
        return null;
      } else {
        const data = action.payload.data() as RoleModel;
        data.rid = action.payload.id;
        console.log('TS: role FOUND for rid: ' + rid);
        return data;
      }
    });

    return this.singleRole;
  }

  getRoles(): Observable<RoleModel[]> {
    this.roles = this.rolesRef.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as RoleModel;
        data.rid = action.payload.doc.id;
        return data;
      });
    });
    return this.roles;
  }

  updateRole(role: RoleModel) {
    role.updatedAt = new Date();
    this.roleDoc = this.rolesRef.doc(role.rid);
    this.roleDoc.update(role);
  }

  deleteRole(role: RoleModel) {
    this.roleDoc = this.rolesRef.doc(role.rid);
    this.roleDoc.delete();
  }

}

