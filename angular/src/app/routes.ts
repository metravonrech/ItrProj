import { Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { CompanyCreatorComponent } from './company-builder/company-creator/company-creator.component';
import { AllCompaniesComponent } from './company-builder/all-companies/all-companies.component';
import { OneCompanyComponent } from './company-builder/one-company/one-company.component';
import { CompanyByCategoryComponent } from './company-builder/company-by-category/company-by-category.component';
import { CommentComponent } from './comments/comment/comment.component';
import { NotFoundComponent } from './not-found-component';
import { StarRatingComponent } from './star-rating/star-rating/star-rating.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent, canActivate:[AuthGuard]
    },

    {
        path: 'userprofile/company-creator', component: CompanyCreatorComponent, canActivate: [AuthGuard]
    },
    { 
        path: 'company/:id', component: OneCompanyComponent,
        children: [{ path: 'comment', component: CommentComponent, canActivate: [AuthGuard] },
                    // {path: '', component: StarRatingComponent}
                ]    
    },
    { 
        path: 'companybycategory/:param', component: CompanyByCategoryComponent 
    },
    {
        path: '', component: AllCompaniesComponent
    },
    { component: NotFoundComponent, path: 'not_found' },
    { path: '**', redirectTo: 'not_found' },
];