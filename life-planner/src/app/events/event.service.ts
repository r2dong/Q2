import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from '../core/auth.service';
import {Observable} from 'rxjs/Observable';
import {EventModel} from './event.model';


@Injectable()
export class EventService {

  eventsRef: AngularFirestoreCollection<EventModel>;
  eventDoc: AngularFirestoreDocument<EventModel>;
  events: Observable<EventModel[]>;
  singleEvent: Observable<EventModel>;

  constructor(private db: AngularFirestore) {
    if (AuthService.isLoggedIn()) {
      console.log('User ID: ' + AuthService.currentUserId());
      this.eventsRef = this.db.collection('users').doc(AuthService.currentUserId()).collection('events');
      this.events = this.eventsRef.valueChanges();
    } else {
      // redirect to login screen please //
      console.log('Why are you here? Who are you?');
    }
  }

  addEvent(event: EventModel) {
    // this.db.collection('finishedExercises').add(event);
    event.createdAt = new Date();
    this.eventsRef.add(event);
  }

  getEvent(eid: string): Observable<EventModel> {
    this.eventDoc = this.eventsRef.doc(eid);

    console.log('ES: ref lookup ' + this.eventDoc.ref.id);
    this.singleEvent = this.eventDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        console.log('ES: event NOT found for eid: ' + eid);
        return null;
      } else {
        const data = action.payload.data() as EventModel;
        data.eid = action.payload.id;
        console.log('ES: event FOUND for eid: ' + eid);
        return data;
      }
    });

    return this.singleEvent;
  }
  getEvents(): Observable<EventModel[]> {
    this.events = this.eventsRef.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as EventModel;
        data.eid = action.payload.doc.id;
        return data;
      });
    });
    return this.events;
  }

  updateEvent(event: EventModel) {
    event.updatedAt = new Date();

    this.eventDoc = this.eventsRef.doc(event.eid);
    this.eventDoc.update(event);
  }

  deleteEvent(event: EventModel) {
    this.eventDoc = this.eventsRef.doc(event.eid);
    this.eventDoc.delete();
  }

}
