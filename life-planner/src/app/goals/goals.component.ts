import {Component, Input, OnInit} from '@angular/core';
import {GoalService} from './goal.service';
import { Router } from '@angular/router';
import {GoalModel} from './goal.model';


@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  @Input() goals: GoalModel[];
  constructor(private gs: GoalService, private router: Router) { }

  ngOnInit() {
    if ( this.router.url === '/goals') {
      this.gs.getGoals().subscribe(goals => {
        this.goals = goals;
      });
    }
  }

}
