import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RanksComponent } from './ranks/ranks.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { InsertComponent } from './insert/insert.component';
import { EditComponent } from './edit/edit.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { CustomrecommendationsComponent } from './customrecommendations/customrecommendations.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { UnauthComponent } from './unauth/unauth.component';

const routes: Routes = [
  {path:'home',component:HomeComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'rank',component:RanksComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'studentDetails',component:StudentDetailsComponent,canActivate: [AuthGuard], data: { roles: ['admin','student'] }},
  {path:'insert',component:InsertComponent},
  {path:'edit',component:EditComponent},
  {path:'recommendations',component:RecommendationsComponent},
  {path:'customrecommendations',component:CustomrecommendationsComponent},
  {path:'addRecord',component:AddRecordComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'register',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'auth',component:AuthPageComponent},
  {path:'',component:AuthPageComponent},
  {path:'unauthorized',component:UnauthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
