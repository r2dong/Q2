import {Component, OnInit, Pipe} from '@angular/core';
import {GoalService} from '../goal.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {GoalModel} from '../goal.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.css']
})

export class GoalDetailComponent implements OnInit {
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
    // Get id from url
    this.gid = this.route.snapshot.params['gid'];
    // Get goal
    console.log('getting gid: ' + this.gid);
    this.goalService.getGoal(this.gid).subscribe(goal => {
      if (goal != null) {
        console.log('goal found for gid: ' + this.gid);
      }
      this.goal = goal;
    });
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.goalService.deleteGoal(this.goal);
      this.flashMessage.show('Task removed', {
        cssClass: 'alert-success', timeout: 1100
      });
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }

}
