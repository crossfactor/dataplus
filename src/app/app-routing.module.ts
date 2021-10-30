import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {AdminComponent} from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './login/signin/signin.component';
import {RegisterComponent} from './login/register/register.component';
import { AuthGuard } from './auth-guard.service';




const routes: Routes = [
  {path: '',canActivate:[AuthGuard],component: AdminComponent},
  {path: 'admin',canActivate:[AuthGuard], component: AdminComponent},
  {path: 'login', component: LoginComponent, 
  children: [{path:'signin', component: SigninComponent},{path:'register', component: RegisterComponent}]},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
