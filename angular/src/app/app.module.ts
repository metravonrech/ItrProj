import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TextParagraphPipe } from './company-builder/text-paragraph.pipe';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './user-shared/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CompanyCreatorComponent } from './company-builder/company-creator/company-creator.component';
import { DragDropDirective } from './company-builder/directives/drag-drop.directive';
import { CompanyService } from '../app/company-shared/company.service';
import { AllCompaniesComponent } from './company-builder/all-companies/all-companies.component';
import { OneCompanyComponent } from './company-builder/one-company/one-company.component';
import { CompanyByCategoryComponent } from './company-builder/company-by-category/company-by-category.component';
import { CommentComponent } from './comments/comment/comment.component';
import { NotFoundComponent } from './not-found-component';
import { CommentService } from './comment-shared/comment.service';
import { StarRatingComponent } from './star-rating/star-rating/star-rating.component';
import { YouToubeComponent } from './youtoube/you-toube.component';

export function provideConfig() {
  let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("417240015664074")
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("16073129096-de3gpdq3igf2hghcmbbans5votkof1lv.apps.googleusercontent.com")
  },
]);
  return config;
}
 
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    CompanyCreatorComponent,
    DragDropDirective,
    AllCompaniesComponent,
    TextParagraphPipe,
    OneCompanyComponent,
    CompanyByCategoryComponent,
    CommentComponent,
    NotFoundComponent,
    StarRatingComponent,
    YouToubeComponent,
    
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    SocialLoginModule,
    MDBBootstrapModule.forRoot(),
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'dlpkhtcim' } as CloudinaryConfiguration),
    NgxYoutubePlayerModule.forRoot()
    
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, UserService, AuthGuard, CompanyService, CommentService, StarRatingComponent,
  {
      provide: AuthServiceConfig,
      useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }


 
