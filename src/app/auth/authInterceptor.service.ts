import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from "../app.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private app: AppService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.app.getJwt();
    if (token) {
      const cloneReq = req.clone({
        headers: req.headers.set('authorization', token),
      });
      return next.handle(cloneReq);
    } else {
      return next.handle(req);
    }
  }
}
