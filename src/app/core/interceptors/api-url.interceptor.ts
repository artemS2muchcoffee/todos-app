import { HttpEvent, HttpHandler, HttpInterceptor,  HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const secureReq = req.clone({
      url: req.url.replace('http://localhost:3000', 'http://localhost:3000')
    });
    console.log(secureReq);
    return next.handle(req);
  }

}
