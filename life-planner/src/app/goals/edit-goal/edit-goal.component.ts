import { Component, OnInit } from '@angular/core';
import {GoalService} from '../goal.service';

import { Router, ActivatedRoute} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {GoalModel} from '../goal.model';

import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.css']
})
export class EditGoalComponent implements OnInit {
  gid: string;
  goal: GoalModel;

  constructor(
    private goalService: GoalService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.gid = this.route.snapshot.params['gid'];
    // Get client
    this.goalService.getGoal(this.gid).subscribe(goal => {
      if (goal != null) {
        console.log('goal found for gid: ' + this.gid);
      }
      this.goal = goal;
    });
  }

  onSubmit({value, valid}: {value: GoalModel, valid: boolean}) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 1100
      });
    } else {
      // Add id to client
      value.gid = this.gid;
      value.createdAt = this.goal.createdAt;
      // Update client
      this.goalService.updateGoal(value);
      this.flashMessage.show('Goal updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }}
