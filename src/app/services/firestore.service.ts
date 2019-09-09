import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentData,
  DocumentReference
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Product } from '../app.interfaces';
import { FirestoreSearchQuery } from './firestoreSearchQuery.interface';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private productCollection: AngularFirestoreCollection<Product>;
  private menuCollection: AngularFirestoreCollection;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.productCollection = db.collection('products');
    this.menuCollection = db.collection('menu', ref => ref.orderBy('weight'));
  }

  addProduct(product: Product): Promise<DocumentReference> {
    return this.productCollection.add(product);
  }

  getProducts(searchQuery: FirestoreSearchQuery): Observable<any> {
    return this.productCollection.valueChanges();
    // // @ts-ignore
    // return this.db.collection('products', ref => {
    //   if (searchQuery.where !== undefined) {
    //     return ref.where(searchQuery.where[0].fieldPath, searchQuery.where[0].opStr, searchQuery.where[0].value);
    //     // searchQuery.where.forEach(obj => {
    //     //   return ref.where(obj.fieldPath, obj.opStr, obj.value);
    //     // });
    //   }
    //   if (searchQuery.limit !== undefined) {
    //     return ref.limit(searchQuery.limit);
    //   }
    //   return ref;
    // }).valueChanges();
  }

  getMenu(): Observable<DocumentData[]> {
    return this.menuCollection.valueChanges();
  }

  getProduct(id: string): Observable<Product> {
    const afd: AngularFirestoreDocument<Product> = this.productCollection.doc(id);
    return afd.valueChanges();
  }

  uploadPhotos(files: FileList): void {
    Array.from(files).forEach(file => {
      const filePath = `products/${file.name}`;
      this.storage.ref(filePath).put(file)
        .catch(error => console.log(error));
    });
  }

  downloadPhoto(path: string): Observable<string> {
    const ref = this.storage.ref(path);
    return ref.getDownloadURL();
  }

  updateProduct(id: string, refs: string[]): void {
    this.productCollection.doc(id).update({
        id,
        img: refs
      })
      .catch(error => console.log(error));
  }
}
