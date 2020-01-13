import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyService } from '../../company-shared/company.service';
import { Router } from '@angular/router';
import { UserService } from '../../user-shared/user.service';


@Component({
  selector: 'app-company-creator',
  templateUrl: './company-creator.component.html',
  styleUrls: ['./company-creator.component.css']
})
export class CompanyCreatorComponent implements OnInit {
  files: any = [];
  companyData = {
    name: '',
    category: '',
    description: '',
    files: [],
    youTubeLink: '',
    sum: '',
    date: ''
  }
  id: string

  constructor(
    private compService: CompanyService, 
    private router: Router, 
    private userService: UserService
    ) { }

  ngOnInit() {
    console.log(this.userService.getUserPayload());
    this.id = this.userService.getUserPayload()._id
  }

  onSubmit(form: NgForm) {
    form.value.files = []
    form.value.id = this.id
    for (let i = 0; i < this.files.length; i++) {

      this.compService.uploadFiles(this.files[i]).then(res => {
        form.value.files.push(res.data.public_id);

        if(this.files[i] === this.files[this.files.length - 1]){
          this.compService.saveData(form.value).subscribe(
            res => {
              this.compService.sendMessage('Successfully saved'); 
              this.router.navigateByUrl('/userprofile');
            },
            err => {
              console.log(err)
            }
          )
        }
      })
    }
  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element);
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

}
