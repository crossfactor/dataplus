import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {DataService} from '../../data.service';
import {ErrorStateMatcher} from '@angular/material/core';





export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  
})
export class SigninComponent implements OnInit {
  
  matcher = new MyErrorStateMatcher();
  
  
  hide:boolean = true;
  userName: string="";
  password: string ="";
  signedin : boolean= false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,]);
  constructor(public auth :AuthService, public data :DataService) { }

  ngOnInit(): void {


   
  }

  onSubmit(loginForm: NgForm) {
    this.auth.login(this.auth.encodeID(loginForm.value.userName),loginForm.value.password)
    //this.username = loginForm.controls['username'].value
    
  }


  logout(){this.auth.logout()}

}


