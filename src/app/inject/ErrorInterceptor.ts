import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {NzModalService} from 'ng-zorro-antd';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private modalService: NzModalService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        // location.reload(true);
      }
      this.modalService.error({
        nzTitle: err.name,
        nzContent: err.message,
        nzOkText: '确定'
      });
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
