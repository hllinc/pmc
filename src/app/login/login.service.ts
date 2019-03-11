import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../sys/models/user';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {DataService} from '../services/data.service';

@Injectable()
export class LoginService {

  options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };

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
    const params = new URLSearchParams();
    params.set('username', user.username);
    params.set('password', user.password);
    params.set('grant_type', 'password');
    const options = Object.assign({header: {'Authorization': 'Basic ' + btoa(appId + ':' + appScret)}}, this.options);
    return this.http.post(environment.serverHost + '/sys/user/login', params.toString(), options).pipe(catchError(this.handleError));
  }

  /**
   * 退出登录
   */
  logout(): Observable<any> {
    return this.http.get(environment.serverHost + '/sys/user/logout');
  }

  /**
   * 请求错误
   * @param error 错误对象
   * @returns {ErrorObservable}
   */
  private handleError(error: Response) {
    const errMsg = error.json();
    return Observable.throw(errMsg['status'] + ':' + errMsg['message']);
  }

}
