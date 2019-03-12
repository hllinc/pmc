/**
 * Created by Hllinc on 2016-11-01 15:29.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable()
export class DataService {

  serverHost: string = environment.serverHost;

  token: string;

  options = {headers: {'Content-Type': 'application/json'}};

  constructor(private http: HttpClient) {
  }

  /**
   * 设置token
   * @param t
   */
  setToken(t: string) {
    this.token = t;
  }

  /**
   * get请求
   * @param url 请求路径
   * @returns {Observable<any>}
   */
  getData(url: string, isMock?: boolean): Observable<any> {
    this.options.headers[ 'Authorization'] = 'Bearer ' + localStorage.getItem('token');
    let uri = '';
    if (isMock) {
      uri = url;
    } else {
      uri = this.serverHost + url;
    }
    return this.http.get(uri, this.options);
  }

  /**
   * post请求
   * @param url 请求路径
   * @param obj 请求body
   * @returns {Observable<any>}
   */
  postData(url: string, body: any = null): Observable<any> {
    this.options.headers[ 'Authorization'] = 'Bearer ' + localStorage.getItem('token');
    return this.http.post(this.serverHost + url, body && JSON.stringify(body), this.options);
  }
}
