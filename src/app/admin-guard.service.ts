import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class AdminGuardService {

  constructor (public authService : AuthService, private router : Router) {} 
private isAdmin;

  canActivate (route: ActivatedRouteSnapshot, 
               state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
                 
                this.authService.roles.subscribe((data:any) =>{ 
                  
                  if (data.admin == true ){
                    this.isAdmin = true
                   
                  } else {this.isAdmin = false; this.router.navigate(['/'])}
                
                }) 
                
                
                return this.isAdmin}

              }
