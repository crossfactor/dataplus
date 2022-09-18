import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import PouchDB from 'pouchdb';
//import PouchDBFind from 'pouchdb-find';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../src/environments/environment';

@Injectable({
  // we declare that this service should be created
  // by the root application injector.
  providedIn: 'root',
})
export class DataService {
  toggledata: boolean = false;
  doubSubject: any = new Subject();
  postSubject: any = new Subject();
  toggleSubject: any = new Subject();
  result: any;
  name: any;
  public doub: any;
  searchData = new Subject();
  productData = new Subject();

  public userdata: any = new BehaviorSubject<any>({
    name: 'Guest',
    pic: './assets/avatar.png',
  });

  public skuData: any = new BehaviorSubject<any>({
    name: 'Guest',
    pic: './assets/avatar.png',
  });

  HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + environment.cdb_a,
    }),
  };

  public all_products: any = new BehaviorSubject<any>([{ id: 1111 }]);
  public testSign: any = new BehaviorSubject<any>(false);

  public db: any;
  private isInstantiated: boolean = false;
  //private listener: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, public zone: NgZone) {
    
    if (localStorage.getItem('signedIn') == 'yes'){
    this.initializeDb(localStorage.getItem('username'),localStorage.getItem('password'))
    }
  
  }

  postData(data) {
    this.db.post(data);
  }



  createdb(email:string){this.db = new PouchDB(email);}

  initializeDb(email: string, pass: string) {
    
    //PouchDB.plugin(PouchDBFind);
    
    var remoteUrl =
      'https://' + email + ':' + pass + '@' + environment.database_url + email;

      
    if (!this.isInstantiated) {
      //console.log("%c"+email,"color:green")
      this.db = new PouchDB(email);
      this.isInstantiated = true;
    }

    let options = {
      live: true,
      retry: true,
      continuous: true,
    };

    this.db
      .sync(remoteUrl, {
        live: true,
        retry: true,
        continuous: true,
        include_docs: true,
      })
      .on('change', function (change: any) {
        // yo, something changed!
       // this.emitPosts();
       // console.log("%c"+"db is updating","color:green")
      })
      .on('paused', function (info: any) {
        // replication was paused, usually because of a lost connection
      })
      .on('active', function (info: any) {
        // replication was resumed
        //console.log("%c"+"db is updating","color:red")
      })
      .on('error', function (err: any) {
        // totally unhandled error (shouldn't happen)
        console.log('error in pouch', err);
      });

    this.db
      .changes({
        live: true,
        since: 'now',
        continuous: true,
        include_docs: true,
      })
      .on('change', (change: any) => {
        if (change.deleted) {
          // document was deleted
          console.log('item deleted');
          this.emitPosts();
        } else {
          console.log('item changed');
          this.emitPosts();
          this.getUserDoc();

          // document was added/modified
        }
      });
    this.getUserDoc();
    //this.emitPosts();
  }

  emitPosts(): void {
    this.zone.run(() => {
      this.db.allDocs({ include_docs: true }).then((data: any) => {
        let posts = data.rows.map((row: any) => {
          return row.doc;
        });
      });
    });
  }



  destroy() {
    this.db.destroy();
  }

  logoutCartData() {}

  hexer(email: string) {
    var text: string = '';
    for (let i = 0; i < email.length; i++) {
      text += '' + email.charCodeAt(i).toString(16);
    }
    return text;
  }

  getUserDoc() {
    this.db.get('userdata').then((doc: any) => {
      this.userdata.next(doc); 
      localStorage.setItem('name', doc.name);
    });
  }

  HttpOptions3 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getSku() {
    this.http
      .get(environment.baseDatabaseURL, this.HttpOptions3)
      .subscribe((data) => {
        //online check
        if (data['couchdb'] == 'Welcome') {
          console.log('Im online');


          this.http.get(environment.sku_url, this.HttpOptions).subscribe((data) => {
            this.skuData.next(data);
          });

        } else {
          console.log('Offline');
        }
      });

    
    //this.skuData.next(dataRows);
    //this.skuData.subscribe((arg) => console.log(arg));
    //console.log(this.productData)
  }

  updateProducts(data) {

    this.http
      .post(environment.update_products_url, data, this.HttpOptions)
      .subscribe((datas) => {console.log(datas)}) } 


  getAllProducts() {
    this.http
      .get(environment.products_url, this.HttpOptions)
      .subscribe((data) => {
        this.all_products.next(data);
        //console.log(data);
      });
    //this.skuData.next(dataRows);

    //console.log(this.productData)
  }

  HttpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' +
        btoa(
          localStorage.getItem('username') +
            ':' +
            localStorage.getItem('password')
        ),
    }),
  };

  test: any;
  getSearch(searchTerm) {
    this.http
      .post(
        'https://' +
          environment.database_url +
          localStorage.getItem('username') +
          '/' +
          '_find',
        { selector: { date: { $regex: '(?i).*' + searchTerm + '.*' } } },
        this.HttpOptions2
      )
      .subscribe((datas) => {
        this.productData.next(datas['docs']);
        console.log(datas);
      });
  }
}
