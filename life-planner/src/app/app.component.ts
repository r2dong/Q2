import { Component } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AuthService} from './core/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(db: AngularFirestore, public auth: AuthService) {
  }
}

