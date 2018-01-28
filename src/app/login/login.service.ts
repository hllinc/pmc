import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from '../sys/models/user';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {

  options = {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest'}};

  constructor(private http: HttpClient) {
  }

  /**
   * 用户登录
   * @param {User} user
   * @returns {Observable<any>}
   */
  login(user: User): Observable<any> {
    const params = new URLSearchParams();
    params.set('username', user.username);
    params.set('password', user.password);
    return this.http.post(environment.serverHost + '/login', params.toString(), this.options).catch(this.handleError);
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
