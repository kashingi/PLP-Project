import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:7400";//API path

  //To set headers
  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  )

  
  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) { }

  //To login user
  public login(loginData: any) {
    return this.httpClient.post(this.PATH_OF_API + "/api/v1/authenticate", loginData, {
      headers: this.requestHeader
    })
  }
  //Register user into the database
  public register(registerData: any) {
    return this.httpClient.post(this.PATH_OF_API + '/api/v1/registerUser', registerData);
  }

  //To fetch user path
  public forUser() {
    return this.httpClient.get(this.PATH_OF_API + "/api/v1/forUser", {
      responseType: "text",
    });
  }

  //Only admin can access
  public forAdmin() {
    return this.httpClient.get(this.PATH_OF_API + "/api/v1/forAdmin", {
      responseType: "text",
    });
  }

  //To fetch and match roles
  public roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: any[] = this.userAuthService.getRoles();
    //To iterate the fetched roles
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {

          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            //return isMatch;
            break;//stop the looping
          } 
          // else {
          //   return isMatch;
          // }
        }
        if (isMatch) {
          break;
        }

      }
    }
    return isMatch;
  }
}
