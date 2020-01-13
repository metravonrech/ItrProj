import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user-shared/user.service'
import { CompanyService } from '../company-shared/company.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails;
  companiesData
  constructor(private userService: UserService, private compService: CompanyService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        console.log('res ', res);
        this.compService.userData = res['user'];
        console.log('userData1 ', this.compService.userData);
        this.compService.getCompanyDetailsByUserId(this.compService.userData.userId).subscribe(
          res => {
            this.companiesData = res
            console.log('res1 ', res)},
          err => console.log(err)
        );
      },
      err => { }
    )
  }

  // getCompanyDetailsByUserId(this.userDetails)
}
