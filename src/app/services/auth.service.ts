/**
 * Created by Hllinc on 2016-10-28 15:15.
 */
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import {DataService} from './data.service';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  // 当前用户
  private user: User = null;

  // 当前角色所有的菜单资源
  currResources: any[] = null;

  // 登录前的路径
  redirectUrl: string = null;

  constructor(private dataService: DataService) {
  }

  /**
   * 获取当前用户
   */
  initCurrentUser(): Observable<any> {
    return this.dataService.getData('/sys/user/getCurrentUser');
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
        subscriber.next(true);
        subscriber.complete();
      } else {
        this.redirectUrl = redirectUrl;
        this.user = user;
        this.currResources = null;
        subscriber.next(true);
        subscriber.complete();
      }
    });
  }

  /**
   * 安全退出
   * @returns {Observable<any>}
   */
  logout(): Observable<any> {
    return this.dataService.getData('/endsession');
  }

  /**
   * 切换岗位
   * @param {string} bianMa
   * @returns {Observable<any>}
   */
  changePost(bianMa: string): Observable<any> {
    return this.dataService.getData('/user/getOrgByPost?gangWeiBianMa=' + bianMa);
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
