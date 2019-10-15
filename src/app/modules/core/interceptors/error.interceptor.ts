import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { JwtService, UserService } from '@modules/core/services';
import { NotificationService } from '../services/error-noticfication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private UserService: UserService, private NotificationService:NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(retry(1), catchError(error => {
            let errorMessage ='';
          
            if (error.error instanceof ErrorEvent) {
              // client-side error
               errorMessage = `Error: ${error.error.message}`;

            } else {
              // server-side error
               errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }

            console.log(errorMessage);

            // this.NotificationService.notify(errorMessage);
            return throwError(errorMessage);
        }))
    }
}

/**
 * error codes defination
 * 200 -- ok
 * 201 -- created
  
 * 400 -- bad request
 * 401 -- unauthorized
 * 404 -- not found 
 */

 