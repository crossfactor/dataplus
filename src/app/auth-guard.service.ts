import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
public SignedIn :boolean = false;

constructor (private authService : AuthService, private router : Router) {} 



canActivate (route: ActivatedRouteSnapshot, 
             state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
              this.authService.signedIn.subscribe((data:boolean) =>{ 
                if (data == true || localStorage.getItem('signedIn') == 'yes' ){
                  this.SignedIn = true
                  
                } else {this.SignedIn = false; this.router.navigate(['/login/signin'])}
              
              }) 
              
              
              return this.SignedIn}
            }