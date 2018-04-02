import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RoleModel } from '../role.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  rid: string;
  role: RoleModel;

  constructor(
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.rid = this.route.snapshot.params['rid'];
    // Get client
    this.roleService.getRole(this.rid).subscribe(role => {
      if (role != null) {
        console.log('role found for tid: ' + this.rid);
      }
      this.role = role;
    });
  }

  onSubmit({value, valid}: {value: RoleModel, valid: boolean}) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add id to client
      value.rid = this.rid;
      value.createdAt = this.role.createdAt;
      // Update client
      this.roleService.updateRole(value);
      this.flashMessage.show('Role updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }

}
