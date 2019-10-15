import { Injectable } from '@angular/core';
import { User } from '../models';


@Injectable({ providedIn: 'root' })
export class JwtService {

  getToken(): String {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.token
    } else {
      return null
    }
  }

  saveToken(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  destroyToken() {
    localStorage.removeItem('user');
  }


}
