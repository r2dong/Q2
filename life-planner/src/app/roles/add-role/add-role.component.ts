import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../role.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RoleModel } from '../role.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  role: RoleModel = {
    rid: '',
    name: '',
  };

  @ViewChild('roleForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private roleService: RoleService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {}


  onSubmit({value, valid}: {value: RoleModel, valid: boolean}) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add new client
      this.roleService.addRole(value);
      // Show message
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to roles
      this.location.back();
    }
  }

  goBack() {
    this.location.back();
  }

}
