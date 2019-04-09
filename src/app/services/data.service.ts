/**
 * Created by Hllinc on 2016-11-01 15:29.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataService {

  serverHost: string = environment.serverHost;

  token: string;

  options = {headers: {'Content-Type': 'application/json'}};

  constructor(private http: HttpClient) {
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  /**
   * get请求
   * @param url 请求路径
   * @returns {Observable<any>}
   */
  get(url: string): Observable<any> {
    // this.options.headers['Authorization'] = 'Bearer ' + this.getToken();
    const uri = this.serverHost + url;
    if (environment.withBackEnd) {
      return this.http.get(uri, this.options);
    } else {
      return this.http.get(uri);
    }
  }

  /**
   * delete请求
   * @param url
   */
  delete(url: string): Observable<any> {
    this.options.headers['Authorization'] = 'Bearer ' + this.getToken();
    const uri = this.serverHost + url;
    if (environment.withBackEnd) {
      return this.http.delete(uri, this.options);
    } else {
      return this.http.delete(uri);
    }
  }

  /**
   * post请求
   * @param url 请求路径
   * @param obj 请求body
   * @returns {Observable<any>}
   */
  post(url: string, body: any = null): Observable<any> {
    this.options.headers['Authorization'] = 'Bearer ' + this.getToken();
    if (environment.withBackEnd) {
      return this.http.post(this.serverHost + url, body && JSON.stringify(body), this.options);
    } else {
      return this.http.post(this.serverHost + url, body && JSON.stringify(body));
    }
  }
}
