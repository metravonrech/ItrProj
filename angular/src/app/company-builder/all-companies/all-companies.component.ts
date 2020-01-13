import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CompanyService } from '../../company-shared/company.service';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css']
})
export class AllCompaniesComponent implements OnInit {
  companies = []

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe(
      res => {
        
        this.companies = this.companies.concat(res)
      },
      err => console.log(err)
    )
  }

}
