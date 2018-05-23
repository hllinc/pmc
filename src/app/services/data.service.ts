/**
 * Created by Hllinc on 2016-11-01 15:29.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ServerData} from '../models/server-data.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {catchError} from 'rxjs/operators';

@Injectable()
export class DataService {

  serverHost: string = environment.serverHost;

  options = {headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'}};

  constructor(private http: HttpClient) {
  }

  /**
   * get请求
   * @param url 请求路径
   * @returns {Observable<any>}
   */
  getData(url: string, isMock?: boolean): Observable<any> {
    let uri = '';
    if (isMock) {
      uri = url;
    } else {
      uri = this.serverHost + url;
    }
    return this.http.get(uri, this.options)
      .pipe(catchError(this.handleError));
  }

  /**
   * post请求
   * @param url 请求路径
   * @param obj 请求body
   * @returns {Observable<any>}
   */
  postData(url: string, body: any = null): Observable<any> {
    return this.http.post(this.serverHost + url, body && JSON.stringify(body), this.options)
      .pipe(catchError(this.handleError));
  }

  /**
   * 请求错误
   * @param error 错误对象
   * @returns {ErrorObservable}
   */
  private handleError(error: HttpErrorResponse) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if (error.status === 403) {
      // 如果后台返回403
      if (window.localStorage) {
        // 缓存要加载的路由
        window.localStorage.setItem('redirectUrl', window.localStorage.getItem('historyUrl'));
      }
      // 跳到服务器要求的指定页面
      window.location.href = error.headers.get('redirect');
    }
    return Observable.throw(errMsg);
  }
}
