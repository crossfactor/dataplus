import { Component, OnInit ,Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  color: string ="white";
  @Input() drinksArray;
  @Output() drinksArrayChange = new EventEmitter();
  constructor() { }

  toggleColor(){
    if( this.color === 'white' )
      this.color = 'teal';
    else
      this.color = 'white';
  }



  ngOnInit(): void {
  }

}
