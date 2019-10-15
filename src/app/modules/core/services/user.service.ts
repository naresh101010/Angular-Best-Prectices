import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  private localStorageUser = JSON.parse(localStorage.getItem('user'))

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {  
    // if user persist in localstroage and token has expired then set the current user to null
    // this.isTokenExpired() == true || token has expired
    if(this.localStorageUser && this.isTokenExpired()){
        this.localStorageUser = null;
    }
    this.currentUserSubject = new BehaviorSubject<User>((this.localStorageUser) as User);
    this.currentUser = this.currentUserSubject.asObservable();    
  }

  //get current user as observable
  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

 public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }



  setAuth(user: User) {
    console.log(this.isTokenExpired())
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user);

    // Set current user data into observable
    this.currentUserSubject.next(user);
  }

  logout(){
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(null);
  }

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
  isTokenExpired():boolean{
    const helper = new JwtHelperService();    
    if(this.localStorageUser){
      return helper.isTokenExpired(this.localStorageUser.token);    
    }             
  }






}
