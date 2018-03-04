import { TestBed, inject } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { TasksService } from './tasks.service';
import * as firebase from 'firebase/app';

describe('TasksService', () => {
  let service: TasksService;



  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksService, AngularFirestore]
    });
  });

  it('should be created', inject([TasksService], (service: TasksService) => {
    expect(service).toBeTruthy();
  }));
});
