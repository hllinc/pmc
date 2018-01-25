import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from '../models/user';

@Injectable()
export class LoginService {

  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
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
    return this.http.post(environment.serverHost + '/login', params.toString(), this.options).map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * 退出登录
   * @returns {Observable<any>}
   */
  logout(): Observable<any> {
    return this.http.get(environment.serverHost + '/logout').map(this.extractData).catch(this.handleError);
  }

  /**
   * 提取数据
   * @param res Response
   * @returns {any|{}}
   */
  private extractData(res: Response) {
    try {
      const body = res.json();
      return body || {};
    } catch (error) {
      console.error('JSON格式错误！');
    }
  }

  /**
   * 请求错误
   * @param error 错误对象
   * @returns {ErrorObservable}
   */
  private handleError(error: Response) {
    const errMsg = error.json();
    return Observable.throw(errMsg.status + ':' + errMsg.message);
  }

}
