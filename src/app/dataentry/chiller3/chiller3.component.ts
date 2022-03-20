import {
  Component,
  Input,
  OnInit,
  forwardRef

 } from '@angular/core';


import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SlideInOutAnimation } from '../../animations';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-chiller3',
  providers:[{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChillerComponent3),
      multi: true
  }],
  templateUrl: './chiller3.component.html',
  styleUrls: ['./chiller3.component.css'],
  animations: [SlideInOutAnimation],
})
export class ChillerComponent3 implements ControlValueAccessor {
  @Input() ChillerData: any[];
 
  public _value: number;
  public disabled: boolean;

  onChanged: any = ()=> {};
  onTouched: any = ()=> {};

  writeValue(val): void {this._value = val};
  registerOnChange(fn: any): void {this.onChanged = fn};  
  registerOnTouched(fn: any): void {this.onTouched = fn};
  setDisabledState(isDisabled: boolean): void {this.disabled = isDisabled};
    
  changes($event) {
    this.onTouched();
    this.onChanged($event.currentTarget.value, console.log($event.currentTarget.value))

  }

    list : []
   dataCollection: any[] = [];

  animationState: string = 'out';


  Chillers3: any[] = [
    {
      company: 'S.M. Jaleel',
      brand_name: 'Fridge',
      category: 'Chillers',
      sub_cat: '',
    },
    {
      company: 'S.M.',
      brand_name: 'Fridge',
      category: 'Chillers',
      sub_cat: '',
    },
  ];

  constructor() {}


 


  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
    }
  }

  update(event: MatSlideToggleChange) {
    //console.log(event.checked , event.source.name),
    var idname = event.source.name;

    this.dataCollection[idname] = event.checked;

    
  }
}
