import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../src/environments/environment';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private route: Router,
    private http: HttpClient,
    public data: DataService
  ) {}
  public signedIn: any = new BehaviorSubject<any>(false);

  post_http_options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + environment.cdb_a,
    }),
  };

  loginData: any;

  public roles: any = new BehaviorSubject<any>({ admin: false });

  LoginHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Sign Up
  signup(Userusername: string, Userpassword: string) {
    return this.http.post(
      environment.base_URL + '_users',
      {
        _id: 'org.couchdb.user:' + Userusername,
        name: Userusername,
        type: 'user',
        roles: [],
        password: Userpassword,
      },
      this.post_http_options
    );
  }

  createNewDatabase(
    email: string,
    Userpassword: string,
    Username: string,
    address: string,
    phoneNumber: number
  ) {
    this.http
      .put(environment.base_URL + email, {}, this.post_http_options)
      .toPromise()
      .then((res) => {
        console.log(res), console.log('first Promise');
      })
      .then((func) => {
        this.http
          .post(
            environment.base_URL + email + '/',
            {
              _id: 'userdata',
              email: this.DecodeID(email),
              name: Username,
              user: email,
              address: address,
              phoneNumber: phoneNumber,
            },

            this.post_http_options
          )
          .subscribe(
            (data) => {
              console.log(data), console.log(2);
            },
            (error) => {
              console.log('something went wrong', error);
            }
          );
      })
      .then((func) => {
        this.http
          .post(
            environment.base_URL + email + '/',
            {
              _id: 'cart',
              items: [],
            },

            this.post_http_options
          )
          .subscribe(
            (data) => {
              console.log(data), console.log(2);
            },
            (error) => {
              console.log('something went wrong', error);
            }
          );
      })
      .then((anfunc) => {
        this.http
          .put(
            environment.base_URL + email + '/_security',
            {
              admins: { names: ['ashiba', email], roles: ['editor'] },
              readers: { names: [], roles: ['reader'] },
            },
            this.post_http_options
          )
          .subscribe((data) => {
            console.log(data), console.log('security created');
          });

        this.login(email, Userpassword);
      });
  }

  // end - sign UP


  login(email: string, pass: string) {
    this.http
      .post(
        environment.baseDatabaseURL + '_session',
        { name: email, password: pass },
        this.LoginHttpOptions
      )
      .subscribe(
        (data) => {
          this.loginData = data;
          console.log(data);
          this.loginData.roles.forEach((element) => {
            if ((element = 'admin')) {
              this.roles.next({ admin: true });
            }
          });

          if (
            this.loginData.ok == true ||
            localStorage.getItem('signedIN') == 'yes'
          ) {
            
            this.data.initializeDb(email, pass), this.setLocalIN(email, pass);
            this.data.testSign.next(true);

            if (
              this.route.url === '/login/signin' ||
              this.route.url === '/login/register'
            ) {
              this.route.navigate(['/']);
            }
          }
        },

        (error: any) => {
          if (error.statusText == 'Unauthorized') {
            console.log('Wrong password', error);
          }
        }
      );

    //this.data.initializeDb(email,pass)
  }

  logout() {
    this.data.destroy();
    this.data.userdata.next({
      name: 'Guest',
      pic: './assets/cup.png',
      points: 0,
      level: 1,
    });
    this.data.testSign.next(false);

    this.setLocalOUT();
    this.route.navigate(['/login/signin']);
  }

  loadAdmin() {
    this.route.navigate(['/admin']);
  }

  setLocalIN(user: string, pass: string) {
    localStorage.setItem('signedIn', 'yes');
    localStorage.setItem('username', user);
    localStorage.setItem('password', pass);
    this.signedIn.next(true);
  }

  setLocalOUT() {
    localStorage.setItem('signedIn', 'no');
    localStorage.setItem('username', null);
    localStorage.setItem('password', null);
    this.signedIn.next(false);
    this.roles.next({ admin: false });
  }

  encodeID(email: string) {
    return email
      .replace(/@/gi, 'xcdfxffp')
      .toLowerCase()
      .replace(/\./gi, 'apmfng');
  }

  DecodeID(email: string) {
    return email
      .replace(/xcdfxffp/gi, '@')
      .toLowerCase()
      .replace(/apmfng/gi, '.');
  }
}
