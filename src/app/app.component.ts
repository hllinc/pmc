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

  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest'});
  options = new RequestOptions({headers: this.headers});

  constructor(private dataService: DataService, private http: Http) {
  }

  login() {
    const params = new URLSearchParams();
    params.set('username', 'hllinc');
    params.set('password', '123');
    // this.dataService.postData('/login', param).subscribe(data => {
    //   console.log(data);
    // });
    document.getElementsByClassName('');


    this.http.post(environment.serverHost + '/login', params.toString(), this.options).subscribe(data => {
      console.log(data);
    });
  }
}
