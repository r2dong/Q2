import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Q2';
  constructor() {
  }

  ngOnInit() {
    // Initialize collapse button
    (<any>$('.button-collapse')).sideNav({
        menuWidth: 300, // Default is 300
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    // Initialize collapsible (uncomment the line below if you use the dropdown variation)
    // $('.collapsible').collapsible();
  }

}

