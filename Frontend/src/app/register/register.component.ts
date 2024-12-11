import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { GolobalConstants } from '../model/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  hide = true;
  registerForm: any = FormGroup;
  responseMessage: any;
  cpassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService: UserService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
     //Set form and validate variables
     this.registerForm = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.pattern(GolobalConstants.emailRegex)]],
      name: [null, [Validators.required, Validators.pattern(GolobalConstants.nameRegex)]],
      password: [null, [Validators.required]],
      cpassword: [null, [Validators.required]],
    })
    if (isPlatformBrowser(this.platformId)) {
      
    }
      
  }
  validateSubmit(){
    if (this.registerForm.controls['password'].value != this.registerForm.controls['cpassword'].value) {
      return true;
    }else{
      return false;
    }
  }

  register() {
    console.log(this.registerForm.value);
    this.ngxService.start();
    this.userService.register(this.registerForm.value).subscribe(
      (response: any) => {
        this.ngxService.stop();
        console.log(response);
        this.snackbar.open("You have Registered successfully.", "X", {
          panelClass: 'snackbar-success',
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
        this.router.navigate(['/login'])
        this.registerForm.reset();
      }, (error: any) => {
        console.log(error);
        this.ngxService.stop();
        this.snackbar.open("System busy, try later", "X", {
          panelClass: 'snackbar-danger',
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        })
      }
    );
  }
}
