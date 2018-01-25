/**
 * Created by Hllinc on 2016-10-28 15:04.
 */
import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {Observable, Subscriber} from 'rxjs';
import {AuthService} from './auth.service';
import {User} from '../models/user';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {
  }

  // ActivatedRouteSnapshot包含了即将被激活的路由，而RouterStateSnapshot包含了该应用即将到达的状态
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // return true;
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): Observable<boolean> | boolean {
    return new Observable<boolean>((subscriber: Subscriber<any>) => {
      // 如果浏览器支持localStorage
      this.authService.initCurrentUser().subscribe((user: User) => {
        if (user) {
          this.authService.initParams(this.authService.redirectUrl || url, user).subscribe((data: boolean) => {
            if (data) {
            } else {
              this.router.navigate(['/login']);
            }
            subscriber.next(true);
            subscriber.complete();
          });
        } else {
          const redirectUrl: string = url.indexOf('login') < 0 ? url : this.authService.redirectUrl;
          this.authService.initParams(redirectUrl).subscribe(() => {
            if (url.indexOf('login') < 0) {
              this.router.navigate(['/login']);
            }
            subscriber.next(true);
            subscriber.complete();
          });
        }
      });
    });
  }
}
