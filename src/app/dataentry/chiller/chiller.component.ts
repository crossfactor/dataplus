import {
  Component,
  Input,
  OnInit,
  Output,
  SimpleChange,
  EventEmitter,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SlideInOutAnimation } from '../../animations';

@Component({
  selector: 'app-chiller',
  templateUrl: './chiller.component.html',
  styleUrls: ['./chiller.component.css'],
  animations: [SlideInOutAnimation],
})
export class ChillerComponent implements OnInit {
  @Input() ChillerData: any[];
  @Input() reset: boolean;
  @Output() ChillersCollected: any = new EventEmitter();

    list : []
  ngOnChanges(changes: SimpleChange) {
    console.log(changes);

    if (changes['ChillerData']) {
      console.log(changes['ChillerData'].currentValue)
      this.list = changes['ChillerData'].currentValue;

      for (let item of this.list) {
        var name = item['company_code'];
        this.dataCollection[name] = 'false';
      }
    } else if (changes['reset']) {
      
      if (changes['reset'].currentValue == true){
        console.log(Object.keys(this.dataCollection))
        for (let item of this.list) {
          var name = item['company_code'];
          this.dataCollection[name] = 'false';
          console.log(this.dataCollection)
          
        }
      }
      
      
    }
    //console.log(this.dataCollection);
  }

  dataCollection: any[] = [];

  animationState: string = 'out';


  Chillers2: any[] = [
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

  ngOnInit(): void {}

  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
    }
  }

  update(event: MatSlideToggleChange) {
    //console.log(event.checked , event.source.name),
    var idname = event.source.name;

    this.dataCollection[idname] = event.checked;

    this.ChillersCollected.emit(this.dataCollection);
  }
}
