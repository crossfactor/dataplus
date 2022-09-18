import { Component, OnInit, AfterViewInit, OnDestroy, EventEmitter,Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

import { DataService } from '../../data.service';

import { AuthService } from '../../auth.service';
import { DatePipe } from '@angular/common';
import { Observable, map, BehaviorSubject, Subscription } from 'rxjs';

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
  dateNtimeStart: any;
  dateNtimeEnd: number;
  dateNtime3: number;
  searchText: string;
  animationState = 'out';

    cignames:any

productData1 :any = new BehaviorSubject<any>([
  {brandName:"Marlboro",size:"regular",flavour:"Red",picture:"../assets/marlboro_red.png"},
  {brandName:"Marlboro",size:"regular",flavour:"Gold",picture:"../assets/marlboro_gold.png"},
  {brandName:"Marlboro",size:"regular",flavour:"Ice",picture:"../assets/marlboro_ice.png"},
  {brandName:"Marlboro",size:"regular",flavour:"Double Fusion",picture:"../assets/marlboro_fusion.png"},
  {brandName:"Marlboro",size:"regular",flavour:"Vista",picture:"../assets/marlboro_vista.png"}
  
]);
 
productData2 :any = new BehaviorSubject<any>([
  {brandName:"Marlboro",size:"Carton",flavour:"Red",picture:"../assets/marlboro_carton_red.png"},
  {brandName:"Marlboro",size:"Carton",flavour:"Gold",picture:"../assets/marlboro_carton_gold.png"},
  {brandName:"Marlboro",size:"Carton",flavour:"Ice",picture:"../assets/marlboro_carton_ice.png"},
  {brandName:"Marlboro",size:"Carton",flavour:"Double Fusion",picture:"../assets/marlboro_carton_fusion.png"}
 

]);

cartonNames:any[] = [
  {brandName:"Marlboro",size:"Carton",flavour:"Red",picture:"../assets/marlboro_carton_red.png"},
  {brandName:"Marlboro",size:"Carton",flavour:"Gold",picture:"../assets/marlboro_carton_gold.png"},
  {brandName:"Marlboro",size:"Carton",flavour:"Ice",picture:"../assets/marlboro_carton_ice.png"},
  {brandName:"Marlboro",size:"Carton",flavour:"Double Fusion",picture:"../assets/marlboro_carton_fusion.png"}
 

]




dispencersArray:any[] = [
  {dispencerName:"Marlboro", Marlboro_share:40},
  {dispencerName:"L_M"},
  {dispencerName:"Rothmans"},
  {dispencerName:"Broadway"},
  {dispencerName:"Du_Maurier"},
  {dispencerName:"Dunhill"},
  {dispencerName:"Revel"},
  {dispencerName:"Zon_King"},
  {dispencerName:"Trini_Blendz"},
  {dispencerName:"Tradition"},


]













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


    //this.dataService.getAllProducts();

    //this.dataService.getSku();
    //this.dataService.skuData.subscribe((arg) => {
    //  this.mergeData = arg['sku'];
    //});

    this.dataService.userdata.subscribe(
      (data) => (this.userDatabase = data.database)
    );

    this.obs = this.dataService.all_products.subscribe((arg) => {
      
   //   console.log(arg)
    });

    //end of for loop
    
   


    this.productData1.subscribe((prods) => this.cignames = prods)
    this.productData2.subscribe((prods) => this.cartonNames = prods)

  }

  ngAfterViewInit(): void {

    this.dataService.db.get('pml-data').then((doc: any) => {
      //this.productData._id = doc._id;
      //this.productData._rev = doc._rev;
    //  console.log(doc)
      this.productData1.next(doc.dataCat1)
      this.productData2.next(doc.dataCat2)
      //this.dataService.db.put(this.arrayData);
    });

  }


  log(val) { console.log(val); }

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


  arrays: any;


  OnSubmit(f: NgForm) {
    
    this.arrays = { ...this.arrays, ...f.form.value};
    //console.log(this.datepipe.transform(this.dateNtimeStart, 'yyyy-MM-dd'));
    this.dateNtimeEnd = +new Date();
    console.log(f.form.value);
   
    //console.log(this.Auth.DecodeID(localStorage.getItem('username')));
   
    this.arrays.dateNtimeStart = this.dateNtimeStart;
    this.arrays.dateNtimeEnd = this.dateNtimeEnd;
    this.arrays.latitude = this.lat;
    this.arrays.longitude = this.long;
    this.arrays.locationAccuracy = this.accu;
    
    //un-comment the following line me, post data to db // 
    this.dataService.postData(this.arrays);
    

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
