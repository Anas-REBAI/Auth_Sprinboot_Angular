import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private currentUser: any;

  user: any;

  constructor(private router : Router) {}
    
  // Method to decode token and cache user information
  decodeTokenAndCacheUserData(): void {
    const token = sessionStorage.getItem('token');

    if (!token) {
      console.log('Token not found in sessionStorage');
      return;
    }

    this.currentUser = this.decodeToken(token);
    console.log('Decoded Token:', this.currentUser);
  }

  // Method to get specific user information
  getUserInfo(key: string): any {
    if (!this.currentUser) {
      this.decodeTokenAndCacheUserData();
    }
    return this.currentUser ? this.currentUser[key] : null;
  }

  // Method to decode the token
  decodeToken(token: string) : any {
    return jwt_decode(token);
  }

  isLoggedIn() {
    const jwt = sessionStorage.getItem('token');
    if (jwt) {
      this.user = this.decodeToken(jwt);
    }
    return !!jwt;
  }

  // exit account
  logOut(){
    sessionStorage.removeItem('token');
    this.router.navigate(["/landing"]);
    this.currentUser=null;
  }


}
