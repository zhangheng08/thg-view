import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ProfileviewComponent } from './profileview/profileview.component';
import { ProfileviewService } from './services/profileview.service';
import { AddProfileService} from './services/add-profile.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { Okta } from './services/okta.service';
import { LoginwidgetComponent } from './loginwidget/loginwidget.component';
import { AuthComponent } from './auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';


const config = {
  issuer: 'https://dev-568215.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oaemv2c1gMvtnwK90h7'
}

const appRoutes: Routes = [
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'profile',
    component: AddProfileComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileviewComponent,
    AddProfileComponent,
    LoginwidgetComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule.initAuth(config),
    CommonModule,
    FileUploadModule
  ],
  providers: [ProfileviewService, AddProfileService, Okta],
  bootstrap: [AppComponent]
})

export class AppModule { }
