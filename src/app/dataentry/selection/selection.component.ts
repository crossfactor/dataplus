import { Component, OnInit ,Input, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectionComponent),
    multi: true
}],

  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements ControlValueAccessor {

  color: string ="white";
  @Input() ChillerData;
  
 checked:boolean = false;

  public _value: number;
  
  public disabled: boolean;

  onChanged: any = ()=> {};
  onTouched: any = ()=> {};

  writeValue(val): void {this._value = val, this.checked=false};
  registerOnChange(fn: any): void {this.onChanged = fn};  
  registerOnTouched(fn: any): void {this.onTouched = fn};
  setDisabledState(isDisabled: boolean): void {this.disabled = isDisabled};
    
  changes($event) {
    this.onTouched();
    this.onChanged( $event.checked)
    this.checked=$event.checked

  }


  constructor() {this.checked = false }

  



 
}
