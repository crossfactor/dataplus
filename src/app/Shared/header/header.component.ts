import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../auth.service';

import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  constructor(
    public dataS: DataService,
    public auth: AuthService,
    private route: Router
  ) {}

  isAuth = false;
  isAdmin = false;
    user:any
  menus = [
    { name: 'Admin', enabled: false, click: 'adminRoute' },
    { name: 'History', enabled: true, click: 'historyRoute' },
    { name: 'Logout', enabled: true, click: 'logout' },
  ];

  ngOnInit() {
    this.dataS.getSku()
    this.auth.signedIn.subscribe((arg) => {
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
    });

    this.dataS.userdata.subscribe(arg =>{this.user = arg; console.log(arg)})

  }

  ngAfterViewInit() {
    this.auth.roles.subscribe((admin) => {
      this.isAdmin = admin.admin;

      this.menus = [
        { name: 'Admin', enabled: true, click: 'adminRoute' },
        { name: 'History', enabled: true, click: 'historyRoute' },
        { name: 'Logout', enabled: true, click: 'logout' },
      ];
    });
  }

  logout() {
    this.auth.logout();
  }

  adminRoute() {
    this.route.navigate(['/admin']);
  }

  profileRoute() {
    this.route.navigate(['/profile']);
  }

  historyRoute() {
    this.route.navigate(['/history']);
  }
}
