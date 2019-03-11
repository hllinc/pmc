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

  options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json'
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
    const params = new HttpParams().set('username', user.username)
      .set('password', user.password).set('grant_type', 'password').set('client_id', appId);
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(appId + ':' + appScret)
      }
    };
    return this.http.post(environment.serverHost + '/oauth/token', params.toString(), options).pipe(catchError(this.handleError));
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
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
