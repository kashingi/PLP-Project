import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  //To set fetched roles
  public setRoles(roles: []) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("roles", JSON.stringify(roles));
    }
    
  }

  //To get fetched roles
  public getRoles(): string[] {
    if (typeof localStorage !== 'undefined') {
      const roles = localStorage.getItem("roles");
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }

  //to set fetched roles
  public setToken(jwtToken: string) {
    if (typeof localStorage !== 'undefined') {//If localStorage is not defined
      localStorage.setItem("jwtToken", jwtToken);
    }
    
  }

  //To get fetched jwttoken
  public getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem("jwtToken");
    }
    return null;
  }

  //Clear localStorage to logout the user
  public clear() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    
  }

  //To check if the user is logged in
  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  //To check if current user is admin
  public isAdmin() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'Admin';
  }

  // To check if current user is User
  public isUser() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'User';
  }
}
