import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserAuthService } from '../services/user-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  hide = true;
  loginForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private userAuthService: UserAuthService
  ){}

  ngOnInit(): void {
    //Set form and validate variables
    this.loginForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    if (isPlatformBrowser(this.platformId)) {
      
    }
  }
  //Submit to login
  onSubmit(): void {
    this.ngxService.start();
    var formData = this.loginForm.value;
    var loginData = {//set login variables
      userName: formData.userName,
      password: formData.password
    }
    console.log(loginData);

    this.userService.login(loginData).subscribe((response: any) => {
      this.ngxService.stop();
      
      console.log(response.user.role[0].roleName);
      console.log(response.user.role[0].roleDescription);
      console.log(response);

      this.userAuthService.setRoles(response.user.role);
      this.userAuthService.setToken(response.jwtToken);
      this.snackbar.open("User login successfully", "X",{
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: 'snackbar-success'
      });
      const role =response.user.role[0].roleName;
      if (role === 'Admin') {
        this.router.navigate(['/admin'])
      } else {
        this.router.navigate(['/user'])
      }

    }, (error) => {//Check if there is an error
      this.ngxService.stop();
      console.log(error);
      this.snackbar.open("Ann error occored", "X", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: 'snackbar-danger'
      })
    })
  }

}
