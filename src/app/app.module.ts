;
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatGridList } from '@angular/material/grid-list';
import { RanksComponent } from './ranks/ranks.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbar } from '@angular/material/toolbar'
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RomanNumeralPipe } from './roman-numeral.pipe';
import { InsertComponent } from './insert/insert.component';
import { EditComponent } from './edit/edit.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { CustomrecommendationsComponent } from './customrecommendations/customrecommendations.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { UnauthComponent } from './unauth/unauth.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RanksComponent,
    NavbarComponent,
    StudentDetailsComponent,
    RomanNumeralPipe,
    InsertComponent,
    EditComponent,
    RecommendationsComponent,
    CustomrecommendationsComponent,
    AddRecordComponent,
    RegistrationComponent,
    LoginComponent,
    AuthPageComponent,
    UnauthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    MatGridList,
    MatToolbar,
    MatListModule,
    MatSidenav,
    MatSidenavContainer,
    MatIcon,
    HttpClientModule,
    FormsModule,
    MatButtonModule,

    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
