import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public dataS: DataService,) { }
  user ={name:"woof"}

  ngOnInit(): void {
    this.dataS.userdata.subscribe(arg =>{this.user = arg; console.log(arg)})

  }

}
