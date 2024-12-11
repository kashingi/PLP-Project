import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {

  }

  //Check if user is logged in
  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  //Logout the user
  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/'])
  }

  //Call isAdmin() from services
  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  //Call isUser to verify that the logged in user is not an Admin
  public isUser() {
    return this.userAuthService.isUser();
  }
}
