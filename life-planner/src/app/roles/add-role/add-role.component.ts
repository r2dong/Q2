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
  pid: string;
  role: RoleModel = {
    tid: '',
    name: '',
    dueDateTime: ''
  };

  @ViewChild('roleForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private roleService: RoleService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.pid = this.route.snapshot.params['pid'];
    console.log(this.pid);
  }

  onSubmit({value, valid}: {value: RoleModel, valid: boolean}) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add new client
      this.roleService.addRole(value, this.pid);
      // Show message
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to roles
      this.location.back();
    }
  }

  goBack(){
    this.location.back();
  }

}
