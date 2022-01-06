import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor(public auth : AuthService,private route : Router) { }

  isAuth = false;
  isAdmin = false;

  menus : any [] = [{name:"Logout",enabled:true,click:"logout"} ,{name:"Admin",enabled:false,click:"adminRoute"}] 

  ngOnInit() {this.auth.signedIn.subscribe(arg => {
    
    this.isAuth = arg;
    
    if (arg == false) {

    if (localStorage.getItem('signedIn') == 'yes') {
      this.isAuth = true;
      this.auth.login(
        localStorage.getItem('username'),
        localStorage.getItem('password')
      );
      
          }
        } 
      

        } )

        


    }


    ngAfterViewInit(){
      this.auth.roles.subscribe(admin => {this.isAdmin = admin.admin ;
      
      this.menus = [{name:"Logout",enabled:true,click:"logout"} ,{name:"Admin",enabled:true,click:"adminRoute"}]
      })}



    logout(){
      this.auth.logout()

    }

    adminRoute(){
      this.route.navigate(['/admin'])
    }



}
