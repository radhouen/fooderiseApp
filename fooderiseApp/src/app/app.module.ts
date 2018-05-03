
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/inscription/inscription.component';

import {ClientService} from './services/client.service';
import { RestaurantService } from './services/restaurant.service';
import { DataService } from './services/data.service';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomeComponent } from './components/home/home.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { RestaurantProfileComponent } from './components/restaurant-profile/restaurant-profile.component';

import { SocialLoginModule, AuthServiceConfig } from 'angular4-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('561602290896109')
  }
]);
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'client',
    component: ClientProfileComponent,
    data: { title: 'client profile' }
  },
  {
    path: 'restaurant',
    component: RestaurantProfileComponent,
    data: { title: 'restaurant profile' }
  },
  { path: '**', component: PagenotfoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InscriptionComponent,
    PagenotfoundComponent,
    HomeComponent,
    ClientProfileComponent,
    RestaurantProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    SocialLoginModule.initialize(config)
  ],
  providers: [ClientService, RestaurantService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
