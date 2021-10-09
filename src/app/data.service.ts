import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  PouchDB from 'pouchdb';
import { Subject, timer } from 'rxjs';
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
  


  private remote = environment.base_URL+'dataplus';
  

  public db: any;
  private isInstantiated: boolean = false;
  private listener: EventEmitter<any> = new EventEmitter();


  constructor(private http: HttpClient, public zone: NgZone) {
    if (!this.isInstantiated) {
      this.db = new PouchDB('dataplus');
     this.isInstantiated = true;
    }


    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, {
      live: true,
      retry: true,
      continuous: true,
      include_docs: false
    }).on('change', function (change) {
      // yo, something changed!
      
    }).on('paused', function (info) {
      // replication was paused, usually because of a lost connection
    }).on('active', function (info) {
      // replication was resumed
      
     }).on('error', function (err) {
      // totally unhandled error (shouldn't happen)
      console.log("error in pouch")
    });
  
    
    
    this.db.changes({live: true, since: 'now',continuous: true, include_docs: true}).on('change', (change) => {
      
      if (change.deleted) {
        // document was deleted
        console.log("item deleted")
        this.emitPosts();
      } else {
        //console.log("item added")
        //console.log (change.doc.heartrate)
        console.log("item changed")
        this.doubSubject.next(change);
        //this.postSubject.next(change);
        this.emitPosts();
        
        // document was added/modified
      }
      
      
      
  }
  
  );

   

  }

  
  //getlocaldb() {

  //  return this.db.allDocs();
 // }


  emitPosts(): void {

    this.zone.run(() => {

        this.db.allDocs({include_docs: true}).then((data) => {
        
          
            let posts = data.rows.map(row => {
              return row.doc;
            });
            
            this.postSubject.next(posts);
            
            

        });

    });
   

}

postData (data){this.db.post(data)};





}




