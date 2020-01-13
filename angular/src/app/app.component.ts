import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user-shared/user.service';
import { CompanyService } from './company-shared/company.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular';
  constructor(public userService: UserService, private router: Router, private companyService: CompanyService){}

  ngOnInit() {

  }


  onLogout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/login')
  }
  
  
}
