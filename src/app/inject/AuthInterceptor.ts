import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataService} from '../services/data.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private dataService: DataService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + this.dataService.getToken())
    });
    return next.handle(authReq);
  }
}
