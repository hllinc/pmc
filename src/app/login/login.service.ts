import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }

  loginForUser(user: User): Observable<any> {
    const params = new URLSearchParams();
    params.set('username', user.username);
    params.set('password', user.password);
    return this.http.post(environment.serverHost + '/login', params.toString(), this.options);
  }

}
