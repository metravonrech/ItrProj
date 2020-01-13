import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../user-shared/user.service';
import { OneCompanyComponent } from '../../company-builder/one-company/one-company.component';
import { CommentService } from '../../comment-shared/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(
    private userService: UserService,
    private companyComponent: OneCompanyComponent,
    private commentService: CommentService,
  ) { }

  comments = [] 
  oldComments = []
  userData = {
    id: String,
    userName: String,
    text: '',
    idCompany: '',
  }

  ngOnInit() {
    this.userData.id = this.userService.getUserPayload()._id;
    this.userData.userName = this.userService.getUserPayload().userName;
    this.userData.idCompany = this.companyComponent.id;
    this.commentService.getOldComments(this.userData.idCompany).subscribe(
      res => {
        this.oldComments = this.oldComments.concat(res)
        console.log('res com ', res);
      }
    )
    this.commentService
      .getMessages()
      .subscribe((message: string) => {
        this.comments.push(message);
        console.log('comments ', this.comments)
      });
  }

  onSubmit() {
    console.log('as ', this.comments);
    this.commentService.sendMessage(this.userData);
    this.userData.text = '';
  }



}
