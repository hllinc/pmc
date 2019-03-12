import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../sys/models/user';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {DataService} from '../services/data.service';
import {RequestOptions} from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  /**
   * 用户登录
   * @param {User} user
   * @returns {Observable<any>}
   */
  login(user: User): Observable<any> {
    const appId = 'myapp';
    const appScret = 'secret';
    const params = new HttpParams().set('username', user.username)
      .set('password', user.password).set('grant_type', 'password');
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(appId + ':' + appScret)
      }
    };
    return this.http.post(environment.serverHost + '/oauth/token', params.toString(), options);
  }

  /**
   * 退出登录
   */
  logout(): Observable<any> {
    const options = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}};
    return this.http.get(environment.serverHost + '/sys/user/logout', options);
  }

}
