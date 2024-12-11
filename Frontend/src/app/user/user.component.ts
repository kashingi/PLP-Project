import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthInterceptor } from '../_auth/auth.interceptor';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  message: any;
  
  constructor(
    private userServicve: UserService,
    private authInterceptor: AuthInterceptor,
    private ngxService: NgxUiLoaderService
  ){}

  ngOnInit(): void {
    this.forUser();//Call the user function
  }

  //Validated that user cannot access admin page
  forUser() {
    this.ngxService.start();
    this.userServicve.forUser().subscribe( (response: any) => {
      this.ngxService.stop();
      console.log(response);
      this.message = response;
      
    }, (error) => {
      this.ngxService.stop();
      console.log(error)
    })
  }
}
