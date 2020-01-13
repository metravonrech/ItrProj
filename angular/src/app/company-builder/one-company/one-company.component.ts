import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { CompanyService } from '../../company-shared/company.service';
import { UserService } from '../../user-shared/user.service';

@Component({
  selector: 'app-one-company',
  templateUrl: './one-company.component.html',
  styleUrls: ['./one-company.component.css']
})
export class OneCompanyComponent implements OnInit {


  idVideo = "1xBtHD-I1wo"

  isChangable: boolean
  summaryRate: number = 0
  companyDetails
  currentSum: number
  addSum
  regexp = /^[0-9]+$/
  id: string
  routerLinkVariable: string
  idUser: string
  userRatingObj = {}
  newRating:number
  ratingMessage:string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if(this.userService.getUserPayload()){
      this.idUser = this.userService.getUserPayload()._id
    }
    
    this.isChangable = true
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id.length === 24) {
      this.companyService.getCompanyDetails(this.id).subscribe(
        res => {
          // console.log('res ', res);
          this.companyDetails = res;
          this.companyRate(this.companyDetails.rating);
          this.currentSum = (this.companyDetails.currentSum / this.companyDetails.sum) * 100
          this.routerLinkVariable = '/company/' + this.id + '/comment'
        },
        err => console.log(err)
      );
    }

  }

  companyRate(ratingArray){
   
    ratingArray.forEach(el => {
      this.userRatingObj[el.idUser] = el.personalRating
    });
    for(let key in this.userRatingObj){
      this.summaryRate += this.userRatingObj[key]
    }
    this.summaryRate = Math.round(this.summaryRate / Object.keys(this.userRatingObj).length)
  }

  donate() {
    if (this.regexp.test(this.addSum) && this.addSum.length < 7) {
      this.currentSum = this.currentSum + (this.addSum / this.companyDetails.sum) * 100
      this.companyService.donate(+this.companyDetails.currentSum + +this.addSum, this.id).subscribe(
        res => {
          this.companyDetails.currentSum += +this.addSum
        },
        err => console.log('error ', err)
      )
    }

  }



  downloadComments() {
    // console.log('MAP1 ', this.userRatingObj);
    // console.log('this ', this.routerLinkVariable);
  }

  rateProject() {
    if (this.idUser && !this.userRatingObj.hasOwnProperty(this.idUser)) {
      this.isChangable = false
    }
  }

  changeRate(newRating: number) {
      // console.log('newRating ', newRating)
    if (this.idUser && !this.isChangable && !this.userRatingObj.hasOwnProperty(this.idUser) && newRating) {
      this.companyService.saveRating(this.id, this.idUser, newRating).subscribe(
        res => { 
          // console.log('res comment ', res)
          this.isChangable = true; 
          this.userRatingObj[this.idUser] = newRating
          this.ratingMessage = "successfully saved"; 
          setTimeout(() => {this.ratingMessage = ''}, 3000)
      },
        err => { console.log('err comment ', err) }
      )
    }
  }
}