import {Component, Input, OnInit} from '@angular/core';
import {RoleService} from './role.service';
import {RoleModel, RoleWeight} from './role.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {
  @Input() roles: RoleModel[];
  @Input() pid: string;

  constructor(private ts: RoleService, private router: Router) { }

  ngOnInit() {
    if ( this.router.url === '/roles') {
      this.ts.getRoles().subscribe(roles => {
        this.roles = roles;
      });
      this.pid = undefined;
    }
  }
}
