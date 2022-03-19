import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  search:string;
 

  constructor(public dataS :DataService) { }

  ngOnInit(): void {
    
    
  }


  getSearch(searchForm : NgForm){
   
   this.dataS.getSearch(searchForm.value.search)

  };


}
