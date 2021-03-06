/**
 * Created by Hllinc on 2016-10-28 15:15.
 */
import {Injectable} from '@angular/core';

import {Observable, Subscriber} from 'rxjs';
import {DataService} from './data.service';
import {User} from '../sys/models/user';
import {Router} from '@angular/router';
import {ServerData} from '../models/server-data.model';

@Injectable()
export class AuthService {

  // 当前用户
  private user: User = null;

  // 当前角色所有的菜单资源
  private currentUserResources: any[] = null;

  // 登录前的路径
  redirectUrl: string = null;

  constructor(private dataService: DataService) {
  }

  /**
   * 获取当前用户
   */
  initCurrentUser(): Observable<any> {
    if (this.user) {
      return new Observable<any>((subscriber: Subscriber<any>) => {
        subscriber.next(new ServerData('从缓存中获取用户信息成功！', 'ok', this.user));
        subscriber.complete();
      });
    } else {
      return this.dataService.getData('/sys/user/getCurrentUser');
    }
  }

  /**
   * 获取当前用户资源
   * @returns {Observable<any>}
   */
  initCurrentUserResources(): Observable<any> {
    return this.dataService.getData('/sys/resource/getCurrentUserResources');
  }

  /**
   * 设置用户值
   * @param {User} user
   */
  setUser(user: User) {
    this.user = user;
  }

  /**
   * 获取用户值
   * @returns {User}
   */
  getUser(): User {
    return this.user;
  }

  /**
   * 获取当前用户资源
   * @returns {any[]}
   */
  getCurrentUserResources() {
    return this.currentUserResources;
  }

  /**
   * 初始化变量
   * @param redirectUrl
   * @param user
   * @returns {Observable<boolean>}
   */
  initParams(redirectUrl?: string, user?: User): Observable<boolean> {
    return new Observable<boolean>((subscriber: Subscriber<any>) => {
      if (user) {
        this.redirectUrl = redirectUrl;
        this.user = user;
        this.initCurrentUserResources().subscribe(data => {
          if (data.code === 'ok') {
            this.currentUserResources = data.result;
          }
          subscriber.next(true);
          subscriber.complete();
        });
      } else {
        this.redirectUrl = redirectUrl;
        this.currentUserResources = null;
        subscriber.next(true);
        subscriber.complete();
      }
    });
  }

  /**
   * 跳转到缓存url
   * @param {Router} router
   */
  navicateToStorageUrl(router: Router) {
    // 如果浏览器支持localStorage
    if (window.localStorage) {
      const redirectUrl = window.localStorage.getItem('redirectUrl');
      if (redirectUrl) {
        // 跳转到登录前要访问的页面
        router.navigate([redirectUrl]);
        // 清空缓存
        window.localStorage.removeItem('redirectUrl');
      }
    }
  }
}
