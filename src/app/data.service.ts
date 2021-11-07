import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  PouchDB from 'pouchdb';
import { Subject, BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  // we declare that this service should be created
  // by the root application injector.
  providedIn: 'root',

})

export class DataService {


toggledata : boolean = false;
  doubSubject : any = new Subject();
  postSubject: any = new Subject();   
  toggleSubject : any = new Subject();
  result: any;
  name :any; 
  public doub :any;
  
  public userdata: any = new BehaviorSubject<any>({
    name: 'Guest',
    pic: './assets/avatar.png',
  });


  public testSign: any = new BehaviorSubject<any>(false);
 
  public db: any;
  private isInstantiated: boolean = false;
  private listener: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, public zone: NgZone) {}

postData (data){this.db.post(data)};

initializeDb(email :string, pass:string) {
  console.log(email)
   var remoteUrl =
     'https://' +
     email +
     ':' +
     pass +
     '@'+environment.database_url +
     email;
    
   if (!this.isInstantiated) {
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
       include_docs: false,
     })
     .on('change', function (change:any) {
       // yo, something changed!
     })
     .on('paused', function (info : any) {
       // replication was paused, usually because of a lost connection
     })
     .on('active', function (info :any) {
       // replication was resumed
     })
     .on('error', function (err :any) {
       // totally unhandled error (shouldn't happen)
       console.log('error in pouch',err);
     });

   this.db
     .changes({
       live: true,
       since: 'now',
       continuous: true,
       include_docs: true,
     })
     .on('change', (change :any) => {
       if (change.deleted) {
         // document was deleted
         console.log('item deleted');
         this.emitPosts();
       } else {
         console.log('item changed');
         this.emitPosts();

         // document was added/modified
       }
     });
     this.getUserDoc()
   //this.emitPosts();
 }


 emitPosts(): void {
   this.zone.run(() => {
     this.db.allDocs({ include_docs: true }).then((data:any) => {
       let posts = data.rows.map((row:any) => {
         return row.doc;
       });

       
     });
   });
 }
destroy(){}
logoutCartData(){}

hexer(email: string) {
 var text: string = '';
 for (let i = 0; i < email.length; i++) {
   text += '' + email.charCodeAt(i).toString(16);
 }
 return text
}

getUserDoc() {
 this.db.get('userdata').then((doc:any) => {
   this.userdata.next(doc);
 });
}

}




