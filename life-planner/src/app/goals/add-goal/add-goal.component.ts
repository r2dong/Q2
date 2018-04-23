import {Component, OnInit, ViewChild} from '@angular/core';
import {GoalService} from '../goal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

import {GoalModel} from '../goal.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {
  goal: GoalModel = {
    gid: '',
    name: '',
    endDate: null,
  };
  @ViewChild('taskForm') form: any;

  constructor(private flashMessage: FlashMessagesService,
              private goalService: GoalService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

  }

  onSubmit({value, valid}: { value: GoalModel, valid: boolean }) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 11000
      });
    } else {
      // Add new client
      this.goalService.addGoal(value);
      // Show message
      this.flashMessage.show('New goal added', {
        cssClass: 'alert-success', timeout: 11000
      });
      // Redirect to tasks
      this.location.back();
    }
  }

  goBack() {
    this.location.back();
  }

}
