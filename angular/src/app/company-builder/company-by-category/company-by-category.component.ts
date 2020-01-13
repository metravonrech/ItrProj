import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

import { Event } from '@angular/router';
import { CompanyService } from '../../company-shared/company.service';

@Component({
  selector: 'app-company-by-category',
  templateUrl: './company-by-category.component.html',
  styleUrls: ['./company-by-category.component.css']
})
export class CompanyByCategoryComponent implements OnInit {

  companyData

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService
  ) {
    let path: string = ''
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if(path){
          this.ngOnInit()
        }
        path = event.url;
      }
    });
  }

  ngOnInit() {
    let param = this.route.snapshot.paramMap.get('param');
    this.companyService.getCompanyDetailsByCategory(param).subscribe(
      res =>  this.companyData = res,
        
      err => console.log(err)

    )
  }



}
