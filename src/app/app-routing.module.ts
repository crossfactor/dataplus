import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataentryComponent } from './dataentry/dataentry.component';
import {AdminComponent} from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './login/signin/signin.component';
import {RegisterComponent} from './login/register/register.component';
import { AuthGuard } from './auth-guard.service';
import { AdminGuardService } from './admin-guard.service';




const routes: Routes = [
  {path: '',canActivate:[AuthGuard],component: DataentryComponent},
  {path: 'admin',canActivate:[AdminGuardService], component: AdminComponent},
  {path: 'login', component: LoginComponent, 
  children: [{path:'signin', component: SigninComponent},{path:'register', component: RegisterComponent}]},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
