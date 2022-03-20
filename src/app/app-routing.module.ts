import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataentryComponent } from './dataentry/dataentry.component';
import {AdminComponent} from './admin/admin.component';
import {ProfileComponent} from './profile/profile.component';
import {HistoryComponent} from './history/history.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './login/signin/signin.component';
import {RegisterComponent} from './login/register/register.component';
import { AuthGuard } from './auth-guard.service';
import { AdminGuardService } from './admin-guard.service';





const routes: Routes = [
  {path: '',canActivate:[AuthGuard],component: DataentryComponent},
  {path: 'admin',canActivate:[AdminGuardService], component: AdminComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'login', component: LoginComponent,
  children: [{path:'signin', component: SigninComponent},{path:'register', component: RegisterComponent}]},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
   
  ]
})
export class AppRoutingModule { }
