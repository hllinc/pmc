import {Component} from '@angular/core';
import {DataService} from './services/data.service';
import {Http, RequestOptions, Headers} from '@angular/http';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor() {
  }
}
