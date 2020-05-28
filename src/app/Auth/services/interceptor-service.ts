import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class myInterceptor implements HttpInterceptor{
      constructor(){}
      intercept(
        request: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
          const req={
              setHeaders:{
                  'Content-Type':'application/json'
              }
          };
          request=request.clone(req)
          return next.handle(request)
      }
  }