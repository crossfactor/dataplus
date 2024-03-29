import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  public skuForm: FormGroup;

  headers: any;
  obs: Subscription;
  obs2: Subscription;
  fileInput: any;
  fileData: any;
  fileArray: any;
  checked: boolean = false;
  editable: boolean = false;
  dataTest: any;
  arrayTest: any = { _id: '', _rev: '' };
  arrayData: any = { _id: '', _rev: '' };
  dateNtime: any;
  all_products: any;
  productFields: any[] = [
    { field: 'sku' },
    { field: 'name' },
    { field: 'company' },
    { field: 'type' },
    { field: 'size' },
    { field: 'measurementUnit' },
    { field: 'brandName' },
    { field: 'flavour' },
    { field: 'category' },
    { field: 'subCat' },
  ];

  pmlData: any;
  googleAuthToken: string = 'woof';

  google_http_options = {
    headers: new HttpHeaders({
      'Content-Type': 'data',
      Authorization: 'Bearer this.googleAuthToken ',
    }),
  };

  constructor(private route: Router, public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllProducts();

    this.obs2 = this.dataService.skuData.subscribe((data) => {
      this.dataTest = data;
      this.arrayTest = this.dataTest.sku;
      //console.log(this.arrayTest);
      //console.log(data.sku.find(x =>x.id =="1112").name);
    });

    this.obs = this.dataService.all_products.subscribe((data) => {
      this.all_products = data; //, console.log(data);
    });
  }

  checkTest() {
    this.checked = true;
  }

  findTest(id: string) {
    return this.dataTest.sku.find((x) => x.sku == id).name;
  }

  add_user() {
    this.route.navigate(['/login/register']);
  }

  jsonData: any;

  changeListener(files: FileList) {
    //this.dataService.getAllProducts();
   // console.log(files.item.length);
   // console.log(files);

    if (files.item.length > 0) {
      var numberOfFiles = files.length;

      for (let iterator = 0; iterator < numberOfFiles; ) {
        //console.log('woof');

        let file: File = files.item(iterator);
        
        iterator++;
        let reader: FileReader = new FileReader();
        reader.readAsText(file);

        const result = [];
        reader.onload = (e) => {
          let csv: string = reader.result as string;

          //split the csv into lines /r last entry on line or new line
          this.fileArray = csv.split(/\r\n|\n/);

          //split the first line into a headers array
          this.headers = this.fileArray[0].split(',');
          console.log(this.headers);
          console.log("woof");
          
          
          //loop over every line except header
          for (var i = 1; i < this.fileArray.length; i++) {
            //set the current line, initially the line after the header
            const currentline = this.fileArray[i].split(',');
            //console.log(this.fileArray.length);
            // console.log(currentline);
            const obj = {};

            //skip blank lines
            if (!this.fileArray[i].match(/^[,\s]*$/)) {
              //regex to find spaces and commas on line only
              //merge the headers with the line data
              for (let j = 0; j < this.headers.length; j++) {
                obj[this.headers[j]] = currentline[j];
              }
              
              result.push(obj);
            } //end of if

            //console.log(obj);
          }
          
          this.arrayData['dataCat' + iterator] = result;
         // console.log(this.arrayData);

          console.log('%cLog Message', 'color: orange');
        };
      }
    } //end of for file loop
    console.log('%cfulldata', 'color: green');
    console.log(this.arrayData);

    this.getData();
    
  }
teestHeaders:any =[]

  getData() {
    this.dataService.db.get('pml-data').then((doc: any) => {
      console.log(doc);
      //this.pmlData.next(doc);
      //console.log(this.pmlData)
      this.arrayData._id = doc._id;
      this.arrayData._rev = doc._rev;

      //this.arrayTest = JSON.stringify(this.arrayTest)
     // this.teestHeaders = this.arrayData.data1[0].keys()
      //console.log(this.arrayData.data1[0].keys());
      this.dataService.db.put(this.arrayData);
    });
  }

  jsonCreate(headers: any, data: any) {}

  OnSubmit(skuForm: NgForm) {
    if (
      this.all_products.edrinks.find(
        (item) => item.sku == skuForm.value.sku
      ) !== undefined
    ) {
      for (let data of this.productFields) {
        console.log(this.all_products.edrinks);
        this.all_products.edrinks.find((item) => item.sku == skuForm.value.sku)[
          data.field
        ] = skuForm.value[data.field];

        //old lookup and merge
        //this.arrayTest.find((item) => item.sku == skuForm.value.sku)[data.field] =
        //  skuForm.value[data.field];
      } //end of for loop

      this.dateNtime = +new Date();

      this.all_products.edrinks.find(
        (item) => item.sku == skuForm.value.sku
      ).modifiedBy = localStorage.getItem('username');
      this.all_products.edrinks.find(
        (item) => item.sku == skuForm.value.sku
      ).dateModified = this.dateNtime;

      console.log(this.all_products.edrinks);
    } else {
      this.dateNtime = +new Date();
      skuForm.value.id = skuForm.value.sku;
      skuForm.value.dateModified = this.dateNtime;
      skuForm.value.modifiedBy = localStorage.getItem('username');
      this.all_products.edrinks.push(skuForm.value);
      console.log(this.all_products);
    }

    this.dataService.updateProducts(this.all_products);
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
    this.obs2.unsubscribe();
  }
}
