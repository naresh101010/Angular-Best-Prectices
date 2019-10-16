import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class UserService {
  private currentUserSubject: BehaviorSubject<User>;  
  private localStorageUser = JSON.parse(localStorage.getItem('user'));

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private router:Router
  ) {
    // If user visit again and token persit
    // if user persist in localstroage and token has expired then set the current user to null    
    if (this.localStorageUser && this.isTokenExpired()) {
         this.localStorageUser = null;
    }
    this.currentUserSubject = new BehaviorSubject<User>((this.localStorageUser) as User);    
  }


  //get current user as value
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  //set user 
  setAuth(user: User) {    
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user);

    // Set current user data into observable
    this.currentUserSubject.next(user);
  }

  //logut and set user to null
  logout() {    
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(null);
    
    // Navigate to Auth screen
    this.router.navigate(['/auth']); 
  }

  // run on both case register and login
  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '/register';
    return this.apiService.post(route, credentials).pipe(map(
      user => {
        this.setAuth(user);
        return user;
      }
    ));
  }

  /**
   * return true if token expire
   * JwtHelperService() belongs to https://github.com/auth0/angular2-jwt
   * JwtHelperService() this checks token expiry.   
   * */
  isTokenExpired(): boolean {
    const helper = new JwtHelperService();
    const token = this.jwtService.getToken();
    if (token) {
      return helper.isTokenExpired(token);
    }
  }
}
