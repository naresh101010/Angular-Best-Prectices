import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService, UserService } from '@modules/core/services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private UserService:UserService, private JwtService:JwtService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
    // make header 
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    
    // get token
    const token = this.JwtService.getToken();
    

    //if token persist then set a new field in header
    if(token){
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    // update header by new one
    const req = request.clone({ setHeaders: headersConfig });
    return next.handle(req);
  }


}
