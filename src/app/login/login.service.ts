import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../sys/models/user';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DataService} from '../services/data.service';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private dataService: DataService) {
  }

  /**
   * 用户登录
   * @param {User} user
   * @returns {Observable<any>}
   */
  login(user: User): Observable<any> {
    // 这块需要写死
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
    if (environment.withBackEnd) {
      return this.http.post(environment.serverHost + '/oauth/token', params.toString(), options);
    } else {
      return this.http.post(environment.serverHost + '/oauth/token', params);
    }
  }

  /**
   * 退出登录
   */
  logout(): Observable<any> {
    const options = {headers: {'Authorization': 'Bearer ' + this.dataService.getToken()}};
    if (environment.withBackEnd) {
      return this.http.get(environment.serverHost + '/sys/user/logout?tokenId=' + this.dataService.getToken(), options);
    } else {
      return this.http.get(environment.serverHost + '/sys/user/logout');
    }
  }

}
