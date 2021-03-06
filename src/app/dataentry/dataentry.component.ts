import { Component, OnInit, EventEmitter, Output, AfterViewInit, OnDestroy, } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { SlideInOutAnimation } from '../animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { Observable, map, Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-dataentry',
  templateUrl: './dataentry.component.html',
  styleUrls: ['./dataentry.component.css'],
  animations: [SlideInOutAnimation],
})
export class DataentryComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() valueChange = new EventEmitter();

 

  ngAfterViewInit(){}



 reset : boolean = false

  public storeForm: FormGroup;

  public myForm: FormGroup;

  userDatabase: any[] = [{ list: 'things' }, { list: 'more things' }];


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





  chanelTypeArray: any[] = [
    { name: 'Wholeseller' },
    { name: 'Supermarket' },
    { name: 'Mini Mart' },
    { name: 'Bar' },
    { name: 'Liquor Store' },
    { name: 'Restaurant' },
    { name: 'Pharmacy' },
    { name: 'Quick Shop' },
    { name: 'Gas Station' },
    { name: 'Other' }
  ];

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

  chillersArray: any[] = [
    {
      company: 'S.M. Jaleel',
      brand_name: 'Fridge',
      category: 'Chillers',
      sub_cat: '',
    },
    {
      company: 'Blue Waters',
      brand_name: 'Fridge',
      category: 'Chillers',
      sub_cat: '',
    }];

  drinksArray: any[] = [
    {
      company: 'Blue Waters Products Ltd',
      brand_name: 'Stamina',
      size: '500ml',
      flavour: 'Fruit Punch',
      category: 'Drink',
      sub_cat: 'Energy Drink',
    }

  ];

  milkArray: any[] = [
    {
      company: 'SM Jaleel & Co. Ltd',
      brand_name: 'Diary Farmers',
      size: '',
      flavour: 'Cherry',
      category: 'Drink',
      sub_cat: 'Flavoured Milk',
    },
    {
      company: 'SM Jaleel & Co. Ltd',
      brand_name: 'Diary Farmers',
      size: '',
      flavour: 'Eggnog',
      category: 'Drink',
      sub_cat: 'Flavoured Milk',
    },
    {
      company: 'SM Jaleel & Co. Ltd',
      brand_name: 'Diary Farmers',
      size: '',
      flavour: 'Peanut Punch',
      category: 'Drink',
      sub_cat: 'Flavoured Milk',
    },
    {
      company: 'SM Jaleel & Co. Ltd',
      brand_name: 'Diary Farmers',
      size: '',
      flavour: 'Chocolate',
      category: 'Drink',
      sub_cat: 'Flavoured Milk',
    },
    {
      company: 'Nestle T&T Ltd',
      brand_name: 'Nestle',
      size: '250ml',
      flavour: 'Eggnog',
      category: 'Drink',
      sub_cat: 'Flavoured Milk',
    },
  ];

  cerealArray: any[] = [
    {
      company: 'Universal Foods Ltd',
      brand_name: 'Bran Flakes',
      size: '330g',
      flavour: 'Regular',
      category: 'Cereal',
      sub_cat: 'Cereal',
    },
    {
      company: 'Universal Foods Ltd',
      brand_name: 'Bran Flakes',
      size: '420g',
      flavour: 'Raisins & Cranberry',
      category: 'Cereal',
      sub_cat: 'Cereal',
    },
    {
      company: 'Universal Foods Ltd',
      brand_name: 'Hoops & Marshmallow',
      size: '280g',
      flavour: 'Marshmallow',
      category: 'Cereal',
      sub_cat: 'Cereal',
    },
    {
      company: 'Universal Foods Ltd',
      brand_name: 'Morning Os',
      size: '30g',
      flavour: 'Nuts & Honey',
      category: 'Cereal',
      sub_cat: 'Cereal',
    },
    {
      company: 'Universal Foods Ltd',
      brand_name: 'Morning Os',
      size: '30g',
      flavour: 'Lightly Frosted',
      category: 'Cereal',
      sub_cat: 'Cereal',
    },
  ];

  maltArray: any[] = [
    {
      company: 'Blue Waters Products Ltd',
      brand_name: 'Stamina',
      size: '500ml',
      flavour: 'Regular Low Calorie',
      category: 'Drink',
      sub_cat: 'Malt',
    },
    {
      company: 'Blue Waters Products Ltd',
      brand_name: 'Stamina',
      size: '500ml',
      flavour: 'Regular Original',
      category: 'Drink',
      sub_cat: 'Malt',
    },
    {
      company: 'Carib Brewery Ltd',
      brand_name: 'Malta (can)',
      size: '355ml',
      flavour: 'Original',
      category: 'Drink',
      sub_cat: 'Malt',
    },
    {
      company: 'Carib Brewery Ltd',
      brand_name: 'Malta (bottle)',
      size: '275ml',
      flavour: 'Original',
      category: 'Drink',
      sub_cat: 'Malt',
    },
  ];

  powderedBevArray: any[] = [
    {
      company: 'Nestle T&T Ltd',
      brand_name: 'Milo',
      size: '200g',
      flavour: 'Chocolate',
      category: 'Drink',
      sub_cat: 'Powdered Beverage',
    },
    {
      company: 'Nestle T&T Ltd',
      brand_name: 'Milo',
      size: '400g',
      flavour: 'Chocolate',
      category: 'Drink',
      sub_cat: 'Powdered Beverage',
    },
    {
      company: 'Nestle T&T Ltd',
      brand_name: 'Milo',
      size: '1000g',
      flavour: 'Chocolate',
      category: 'Drink',
      sub_cat: 'Powdered Beverage',
    },
    {
      company: 'Nestle T&T Ltd',
      brand_name: 'Milo',
      size: '18x30g',
      flavour: 'Chocolate',
      category: 'Drink',
      sub_cat: 'Powdered Beverage',
    },
  ];

  arrays: any;

  constructor(
    public datepipe: DatePipe,
    public Auth: AuthService,
    public dataService: DataService,
    private snackBar: MatSnackBar,
   
    
  ) {
    this.storeForm = new FormGroup({
      sid: new FormControl(),
      sname: new FormControl(),
      ctype: new FormControl(),
      saddress: new FormControl(),
      sarea: new FormControl(),
      scontact: new FormControl(),
      stel: new FormControl(),
    });

    

  }




  public Edrinks: any[] = [
    {
      company: 'Nestle T&T Ltd',
      brand_name: 'Milo',
      size: '18x30g',
      flavour: 'Chocolate',
      category: 'Drink',
      sub_cat: 'Powdered Beverage',
    },
  ];

  public Edrinks2: Subject<any> = new Subject();

  public Chillers: [] = [];
  public chillerInput: [] = [];
  public arrayTest: any;
  public mergeData: any;
  public selectedDatabase ;

  




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
      this.Edrinks = arg.edrinks;
      this.maltArray = arg.maltdrinks;
      this.Chillers = arg.chillers;
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

  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
    }
  }

  openSnackBar(x: number, y: number) {
    const dif = (y / 1000 - x / 1000) / 60;
    const message = 'Survey took ' + dif + ' minutes' + Math.round(dif);
    this.snackBar.open(message, 'action', {
      duration: 8000,
    });
  }

  merge() {
    for (let polo of this.mergeData) {
      this.Edrinks.find((item) => item.sku == polo.sku).brand_name = polo.sku;
      //console.log(this.Edrinks);
    }
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

    this.openSnackBar(this.dateNtimeStart, this.dateNtimeEnd);
    //console.log(this.dateNtimeStart, this.dateNtimeEnd);
    // console.log(this.lat, this.long, this.accu);

    this.arrays = { ...this.arrays, ...f.form.value , ...this.chillerInput};
    this.arrays.dateNtimeStart = this.dateNtimeStart;
    this.arrays.dateNtimeEnd = this.dateNtimeEnd;
    this.arrays.latitude = this.lat;
    this.arrays.longitude = this.long;
    this.arrays.locationAccuracy = this.accu;
    console.log(this.chillerInput)
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
  chillerRecieve(e) {
    console.log(e);
    this.chillerInput = e
  
  }
  // this.arrays ={...this.arrays,...e} }

  resets(){this.reset = !this.reset}

ngOnDestroy(){
this.obs.unsubscribe()

}

}
