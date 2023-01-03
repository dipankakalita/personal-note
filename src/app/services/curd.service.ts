import {query} from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class CurdService {

    constructor(private firestore: AngularFirestore) { }

    insertToFixId(collection:string, id:string, data:any):any {
      return this.firestore.collection(collection).doc(id).set(data);
    }

    insert(collection:string, data:any):any {
      return this.firestore.collection(collection).add(data);
    }

    getDataByColumnName(collectionName:string, columnName:string, data:string):any { 
      const db = this.firestore.collection(collectionName,query=>query.where(columnName,"==",data)).snapshotChanges();
      return db;
    }

    getDataById(collectionName:string, id:string):any { 
      const db = this.firestore.collection(collectionName).doc(id).get();
      return db;
    }

    deleteDataById(collectionName:string, id:string):any { 
      const db = this.firestore.collection(collectionName).doc(id).delete();
      return db;
    }

    updateDataById(collectionName:string, id:string, data:any):any { 
      const db = this.firestore.collection(collectionName).doc(id).update(data);
      return db;
    }

}









