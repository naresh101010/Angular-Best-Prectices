import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env';

import { JwtService, UserService } from '@modules/core/services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private UserService:UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
    // add auth header with jwt if user is logged in and request is to api url
    const currentUser = this.UserService.currentUserValue;

    // get current user 
    const token = currentUser && currentUser.token;      
      
    if(token){
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`
            }
        });
    }

      return next.handle(request);
  }


}
