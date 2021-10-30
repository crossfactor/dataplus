import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../../auth.service';
import {DataService} from '../../data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl , FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  hide:boolean = true;
  email: string = "";
  userName: string = "";
  name: string = "";
  password: string ="";  
  newData: any = {ok:""};
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  coded: any
  coded2: any
  signedin:any
  
  constructor(public auth :AuthService,public data : DataService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    

  }

  onSubmit(loginForm:any) {
    //this.username = loginForm.controls['username'].value

    //this.hexed(this.encodeID(loginForm.value.email))



    // replace block
     this.auth.signup(this.encodeID(loginForm.value.email),loginForm.value.password).subscribe(
       data => {this.newData = data; if(this.newData.ok == true ){this.openSnackBar("User Created"); 
       this.auth.createNewDatabase(this.encodeID(loginForm.value.email),loginForm.value.password,loginForm.value.name,loginForm.value.address,loginForm.value.contactNumber),
       console.log("Success")}; },
       
       error => {if (error.statusText == "Conflict"){this.openSnackBar("Email already exists"), console.log('something went wrong', error)}})
       
  }


  hexed(email:string){ 
    console.log(email);
    var text:string=""
    for(let i =0; i < email.length; i++){
      text += ''+email.charCodeAt(i).toString(16)

      console.log(text)

    }
    //console.log(email.charCodeAt(0).toString(16))

  }


  openSnackBar(message:any) {
    this._snackBar.open(message, "", {
      duration: 4000,
    });
  }

encodeID(user:any){return user.replace(/@/gi, "xcdfxffp").toLowerCase().replace(/\./gi,"apmfng")}




}
