import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dataplus';

  isAuth: boolean = false;

  constructor(public auth: AuthService) {
    /*

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

*/
  }
}
