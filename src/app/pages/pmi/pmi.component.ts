import { Component, OnInit, OnDestroy, EventEmitter,Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

import { DataService } from '../../data.service';

import { AuthService } from '../../auth.service';
import { DatePipe } from '@angular/common';
import { Observable, map, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-pmi',
  templateUrl: './pmi.component.html',
  styleUrls: ['./pmi.component.css']
})
export class PmiComponent implements OnInit ,OnDestroy{

  constructor(
    public datepipe: DatePipe,
    public Auth: AuthService,
    public dataService: DataService,
    
   
    
  
  ) { }

  @Output() valueChange = new EventEmitter();

  obs : Subscription
  obs2 : Subscription


  color: string;
  storeName: string;
  storeAddress: string;
  contactPerson: string;
  contactNumber: string;
  area: string;
  chanelType: string;
  long: number = 0;
  lat: number = 0;
  accu: number = 40;
  permissionState: string = 'test';
  x: number = 0;
  dateNtimeStart: number;
  dateNtimeEnd: number;
  dateNtime3: number;
  searchText: string;
  animationState = 'out';

cignames:any[] = [
  {brandName:"Marlboro",size:"regular",flavour:"Red",picture:"../assets/marlboro_red.png"},
  {brandName:"Marlboro",size:"regular",flavour:"Gold",picture:"../assets/marlboro_gold.png"},
  {brandName:"Marlboro",size:"regular",flavour:"Ice",picture:"../assets/marlboro_ice.png"},
  {brandName:"Marlboro",size:"regular",flavour:"Double Fusion",picture:"../assets/marlboro_fusion.png"},
  {brandName:"Marlboro",size:"regular",flavour:"Vista",picture:"../assets/marlboro_vista.png"},
  {brandName:"L&M",size:"20s",flavour:"Red",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"L&M",size:"10s",flavour:"Red",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"L&M",size:"regular",flavour:"Purple",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Rothmans",size:"regular",flavour:"20s",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Rothmans",size:"regular",flavour:"10s",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Broadway",size:"regular",flavour:"Broadway",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Du Maurier",size:"20s",flavour:"Maurier",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Du Maurier",size:"10s",flavour:"Maurier",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Dunhill",size:"20s",flavour:"Red",picture:"../assets/dunhill_red2.png"},
  {brandName:"Dunhill",size:"10s",flavour:"Red",picture:"../assets/dunhill_red.png"},
  {brandName:"Dunhill",size:"20s",flavour:"Blue",picture:"../assets/dunhill_blue.png"},
  {brandName:"Dunhill",size:"regular",flavour:"Switch",picture:"../assets/dunhill_switch.png"},
  {brandName:"Dunhill",size:"regular",flavour:"Double Pink",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Dunhill",size:"regular",flavour:"Double Orange",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Dunhill",size:"regular",flavour:"Double Release",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Revel",size:"regular",flavour:"Gold",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Revel",size:"regular",flavour:"Blue",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Revel",size:"regular",flavour:"Green",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Zon",size:"regular",flavour:"King",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Trini Blendz",size:"regular",flavour:"Trini Blendz",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Tradition",size:"regular",flavour:"Tradition",picture:"../assets/cigarette_placeholder.png"},
  {brandName:"Gold Seal",size:"regular",flavour:"Gold Seal",picture:"../assets/cigarette_placeholder.png"},  

]
 


cartonnames:any[] = [
  {brandName:"Marlboro",size:"Carton",flavour:"Red",picture:"../assets/marlboro_carton_red.png"},
  {brandName:"Marlboro",size:"Carton",flavour:"Gold",picture:"../assets/marlboro_carton_gold.png"},
  {brandName:"Marlboro",size:"Carton",flavour:"Ice",picture:"../assets/marlboro_carton_ice.png"},
  {brandName:"Marlboro",size:"Carton",flavour:"Double Fusion",picture:"../assets/marlboro_carton_fusion.png"},
  {brandName:"Marlboro",size:"Carton",flavour:"Vista",picture:"../assets/marlboro_carton_vista.png"},
  {brandName:"L&M",size:"20s",flavour:"Red",picture:"../assets/malboro_red.png"},
  {brandName:"L&M",size:"10s",flavour:"Red",picture:"../assets/malboro_red.png"},
  {brandName:"L&M",size:"regular",flavour:"Purple",picture:"../assets/malboro_red.png"},
  {brandName:"Rothmans",size:"regular",flavour:"20s",picture:"../assets/malboro_red.png"},
  {brandName:"Rothmans",size:"regular",flavour:"10s",picture:"../assets/malboro_red.png"},
  {brandName:"Broadway",size:"regular",flavour:"Broadway",picture:"../assets/malboro_red.png"},
  {brandName:"Du Maurier",size:"20s",flavour:"Maurier",picture:"../assets/malboro_red.png"},
  {brandName:"Du Maurier",size:"10s",flavour:"Maurier",picture:"../assets/malboro_red.png"},
  {brandName:"Dunhill",size:"20s",flavour:"Red",picture:"../assets/malboro_red.png"},
  {brandName:"Dunhill",size:"10s",flavour:"Red",picture:"../assets/malboro_red.png"},
  {brandName:"Dunhill",size:"20s",flavour:"Blue",picture:"../assets/malboro_red.png"},
  {brandName:"Dunhill",size:"regular",flavour:"Switch",picture:"../assets/malboro_red.png"},
  {brandName:"Dunhill",size:"regular",flavour:"Double Pink",picture:"../assets/malboro_red.png"},
  {brandName:"Dunhill",size:"regular",flavour:"Double Orange",picture:"../assets/malboro_red.png"},
  {brandName:"Dunhill",size:"regular",flavour:"Double Release",picture:"../assets/malboro_red.png"},
  {brandName:"Revel",size:"regular",flavour:"Gold",picture:"../assets/malboro_red.png"},
  {brandName:"Revel",size:"regular",flavour:"Blue",picture:"../assets/malboro_red.png"},
  {brandName:"Revel",size:"regular",flavour:"Green",picture:"../assets/malboro_red.png"},
  {brandName:"Zon",size:"regular",flavour:"King",picture:"../assets/malboro_red.png"},
  {brandName:"Trini Blendz",size:"regular",flavour:"Trini Blendz",picture:"../assets/malboro_red.png"},
  {brandName:"Tradition",size:"regular",flavour:"Tradition",picture:"../assets/malboro_red.png"},
  {brandName:"Gold Seal",size:"regular",flavour:"Gold Seal",picture:"../assets/malboro_red.png"},  

]




dispencersArray:any[] = [
  {dispencerName:"Marlboro"},
  {dispencerName:"L&M"},
  {dispencerName:"Rothmans"},
  {dispencerName:"Broadway"},
  {dispencerName:"Du_Maurier"},
  {dispencerName:"Dunhill"},
  {dispencerName:"Revel"},
  {dispencerName:"Zon_King"},
  {dispencerName:"Trini_Blendz"},
  {dispencerName:"Tradition"},


]











arrays: any;

  reset : boolean = false

  public storeForm: FormGroup;

  public myForm: FormGroup;

  userDatabase: any[] = [{ list: 'things' }, { list: 'more things' }];

  areaArray: any[] = [
    { name: 'Barataria' },
    { name: 'Morvant' },
    { name: 'San Juan' },
    { name: 'Petit Bourg' },
    { name: 'Champs Fleur' },
    { name: 'Curepe' },
    { name: 'St. Augustine' },
    { name: 'Tunapuna' },
    { name: 'Tacarigua' },
    { name: 'El Dorado' },
    { name: 'Trincity' },
    { name: 'Port of Spain' },
  ];

  chanelTypeArray: any[] = [
    { name: 'Bar' },
    { name: 'Gas Station' },
    { name: 'Grocery' },
    { name: 'Liqor Store' },
    { name: 'Mini Mart' },
    { name: 'Mom & Pop' },
    { name: 'Pharmacy' },
    { name: 'Restaurant' },
    { name: 'Supermarket' },
    { name: 'Wholesaler' },
    { name: 'Other' }
  ];

  ngOnInit(): void {


    this.dataService.getAllProducts();

    //this.dataService.getSku();
    //this.dataService.skuData.subscribe((arg) => {
    //  this.mergeData = arg['sku'];
    //});

    this.dataService.userdata.subscribe(
      (data) => (this.userDatabase = data.database)
    );

    this.obs = this.dataService.all_products.subscribe((arg) => {
      
      console.log(arg)
    });

    //end of for loop


  }

  



  getLocation(): void {
    this.dateNtimeStart = +new Date();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const longitude = position.coords.longitude;

          const latitude = position.coords.latitude;
          const accuracy = position.coords.accuracy;
          this.long = longitude;
          this.accu = accuracy;
          this.lat = latitude;
          this.valueChange.emit(this.long);
          this.valueChange.emit(this.accu);

          console.log(longitude, latitude, accuracy);
        },
        (error) => {},
        { enableHighAccuracy: true }
      );
    } else {
      console.log('No support for geolocation');
    }
  }

  permissionCheck() {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(function (permissionStatus) {
        console.log('geolocation permission state is ', permissionStatus.state);

        permissionStatus.onchange = function () {
          console.log(
            'geolocation permission state has changed to ',
            this.state
          );
        };
      });
  }

  toggleColor() {
    if (this.color === 'white') this.color = 'teal';
    else this.color = 'white';
  }





  OnSubmit(f: NgForm) {
    console.log(this.datepipe.transform(this.dateNtimeStart, 'yyyy-MM-dd'));
    this.dateNtimeEnd = +new Date();
    //console.log(f.form.value);
    console.log(this.storeForm.value);
    //console.log(this.Auth.DecodeID(localStorage.getItem('username')));
    console.log(
      (this.storeForm.value.sid = this.datepipe.transform(
        this.dateNtimeStart,
        'yyyyMMdd-hhmm'
      ))
    );

    this.storeForm.value.sid = this.datepipe.transform(
      this.dateNtimeStart,
      'yyyyMMdd-hhmm'
    )

   

    this.arrays = { ...this.arrays, ...f.form.value };
    this.arrays.dateNtimeStart = this.dateNtimeStart;
    this.arrays.dateNtimeEnd = this.dateNtimeEnd;
    this.arrays.latitude = this.lat;
    this.arrays.longitude = this.long;
    this.arrays.locationAccuracy = this.accu;
    
    //un-comment me, post data to db // this.dataService.postData(this.arrays);
    

    console.log(this.arrays);

    this.dateNtimeStart = 0;
    this.dateNtimeEnd = 0;
    this.lat = 0;
    this.long = 0;
    this.accu = 0;
        this.reset = true;
    f.resetForm();
    
  }
  

  resets(){this.reset = !this.reset}

ngOnDestroy(){
this.obs.unsubscribe()

}










}
