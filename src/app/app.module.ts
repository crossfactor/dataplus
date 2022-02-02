import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataentryComponent } from './dataentry/dataentry.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';

import { AuthGuard } from './auth-guard.service';
import { AdminGuardService } from './admin-guard.service';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {SelectionComponent} from './dataentry/selection/selection.component';
import {FilterPipe} from './pipes/filter.pipe';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { SigninComponent } from './login/signin/signin.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './Shared/header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';



@NgModule({
  declarations: [
    AppComponent,
    DataentryComponent,
    SelectionComponent,
    LoginComponent,
    RegisterComponent,
    SigninComponent,
    FilterPipe,
    HeaderComponent,
    AdminComponent,
    ProfileComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
         ServiceWorkerModule.register('ngsw-worker.js', {
           enabled: environment.production,
           // Register the ServiceWorker as soon as the app is stable
           // or after 30 seconds (whichever comes first).
           registrationStrategy: 'registerWhenStable:30000'
         }),


  ],
  providers: [DataService,AuthService,AuthGuard,AdminGuardService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
