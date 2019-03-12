/**
 * Created by Hllinc on 2016-10-28 15:04.
 */
import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {Observable, Subscriber} from 'rxjs';
import {AuthService} from './auth.service';
import {User} from '../sys/models/user';
import {ServerData} from '../models/server-data.model';
import {DataService} from './data.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router, private dataService: DataService) {
  }

  // ActivatedRouteSnapshot包含了即将被激活的路由，而RouterStateSnapshot包含了该应用即将到达的状态
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // return true;
    if (this.dataService.getToken()) {
      return this.checkLogin(state.url);
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): Observable<boolean> | boolean {
    return new Observable<boolean>((subscriber: Subscriber<any>) => {
      this.authService.initCurrentUser().subscribe((serverData: any) => {
        const user = serverData;
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
