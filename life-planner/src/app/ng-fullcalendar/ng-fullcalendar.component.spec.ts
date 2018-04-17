import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFullcalendarComponent } from './ng-fullcalendar.component';

describe('NgFullcalendarComponent', () => {
  let component: NgFullcalendarComponent;
  let fixture: ComponentFixture<NgFullcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgFullcalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFullcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
