import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RoleModel } from '../role.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {
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
    // Get id from url
    this.rid = this.route.snapshot.params['rid'];
    // Get role
    console.log('getting tid: ' + this.rid);
    this.roleService.getRole(this.rid).subscribe(role => {
      if (role != null) {
        console.log('role found for tid: ' + this.rid);
      }
      this.role = role;
    });
  }


  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.roleService.deleteRole(this.role);
      this.flashMessage.show('Role removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }

}
