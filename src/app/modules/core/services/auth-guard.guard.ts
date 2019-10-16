import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private UserService:UserService
    ) { }
    canActivate() {        
        const currentUser = this.UserService.currentUserValue;        
        
        //if user persist
        if (currentUser) {          
            return true;
        }
        // if user not persist then remove token 
        this.UserService.logout();                       
        //return false for gaurd route
        return false;
    }
}