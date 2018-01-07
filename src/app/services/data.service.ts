/**
 * Created by Hllinc on 2016-11-01 15:29.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {ServerData} from '../models/server-data.model';
import 'rxjs/Rx';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {

  serverHost: string = environment.serverHost;

  headers = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }

  /**
   * get请求
   * @param url 请求路径
   * @returns {Observable<ServerData>}
   */
  getData(url: string, isMock?: boolean): Observable<ServerData> {
    let uri = '';
    if (isMock) {
      uri = url;
    } else {
      uri = this.serverHost + url;
    }
    return this.http.get(uri, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * post请求
   * @param url 请求路径
   * @param obj 请求body
   * @returns {Observable<ServerData>}
   */
  postData(url: string, body: any = null): Observable<ServerData> {
    return this.http.post(this.serverHost + url, body && JSON.stringify(body), this.options)
      .map(this.extractData)
      .catch(this.handleError);
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
