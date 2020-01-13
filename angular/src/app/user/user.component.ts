import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Router } from "@angular/router";

import { UserService } from "../user-shared/user.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  serverErrorMessages: string

  constructor(private socialAuthService: AuthService, 
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    
  }

  public signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log(FacebookLoginProvider.PROVIDER_ID +" sign in data : " , userData);
        this.userService.loginViaFacebook({access_token: userData.authToken}).subscribe(
          res => {
            console.log('res' , res);
            this.userService.setToken(res['token']);
            this.router.navigateByUrl('/userprofile');
          },
          err => {
            this.serverErrorMessages = err.error.message;
          }
        );
      }
    );
  }

  public signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.userService.loginViaGoogle({access_token: userData.authToken}).subscribe(
          res => {
            console.log('res' , res);
            this.userService.setToken(res['token']);
            this.router.navigateByUrl('/userprofile');
          },
          err => {
            this.serverErrorMessages = err.error.message;
          }
        );
      }
    );
  }
  
  
}
