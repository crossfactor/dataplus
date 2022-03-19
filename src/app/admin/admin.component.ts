import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public skuForm: FormGroup;

  fileInput: any;
  fileData: any;
  fileArray: any;
  checked: boolean = false;
  editable: boolean = true;
  dataTest: any;
  arrayTest: any[] = [{}];
  dateNtime: any;
  productFields: any[] = [
    { field: 'sku' },
    { field: 'name' },
    { field: 'Company' },
    { field: 'type' },
    { field: 'size' },
    { field: 'measurementUnit' },
    { field: 'brandName' },
    { field: 'flavour' },
    { field: 'category' },
    { field: 'subCat' },
  ];
  constructor(private route: Router, public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.skuData.subscribe((data) => {
      this.dataTest = data;
      this.arrayTest = this.dataTest.sku;
      console.log(this.arrayTest);
      //console.log(data.sku.find(x =>x.id =="1112").name);
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

  changeListener(files: FileList) {
    if (files.item.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        //console.log(csv);
        this.fileArray = csv.split(/\r\n|\n/);
        console.log(this.fileArray);
      };
    }
  }

  OnSubmit(skuForm: NgForm) {
    

    for (let data of this.productFields) {
      this.arrayTest.find((item) => item.sku == skuForm.value.sku)[data.field] =
        skuForm.value[data.field];
    } //end of for loop

    this.dateNtime = +new Date();

    this.arrayTest.find((item) => item.sku == skuForm.value.sku).modifiedBy =
      localStorage.getItem('username');
    this.arrayTest.find((item) => item.sku == skuForm.value.sku).dateModified =
      this.dateNtime;

    console.log(this.arrayTest);
  }
}
