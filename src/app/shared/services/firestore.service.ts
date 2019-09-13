import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentData,
  DocumentReference
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { combineLatest, Observable } from 'rxjs';
import { Product } from '../../app.interfaces';
import { FirestoreSearchQuery } from './firestoreSearchQuery.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private productCollection: AngularFirestoreCollection<Product>;
  private categoryCollection: AngularFirestoreCollection;
  private menuCollection: AngularFirestoreCollection<DocumentData>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.productCollection = db.collection('products');
    this.categoryCollection = db.collection('product_categories');
    this.menuCollection = db.collection('menu', ref => ref.orderBy('weight'));
  }

  addProduct(product: Product): Promise<DocumentReference> {
    return this.productCollection.add(product);
  }

  getProductCategories() {
    return this.db.collection('product_categories', ref => ref.orderBy('weight')).valueChanges();
  }

  // getProductCategories2() {
  //   this.db.collection('products').valueChanges().subscribe(
  //     products => {
  //       console.log('prpr', products.map(product => product.category));
  //       return products.map(product => product.category);
  //     }
  //   );
  // }

  getProducts(searchQuery): Observable<any> {
    // @ts-ignore
    return this.db.collection('products', ref => {
      return ref.where(`category.parentId`, '==', searchQuery);
      // if (searchQuery.where !== undefined) {
      //   console.log(searchQuery.where);
      //   return ref.where('category', '==', searchQuery.where);
      //   // searchQuery.where.forEach(obj => {
      //   //   return ref.where(obj.fieldPath, obj.opStr, obj.value);
      //   // });
      // }
      // if (searchQuery.limit !== undefined) {
      //   return ref.limit(searchQuery.limit);
      // }
      // return ref;
    }).valueChanges();
  }

  getMenu(): Observable<DocumentData[]> {
    return this.menuCollection.valueChanges();
  }

  getMenuCategories(parentId) {
    const categories = this.db.collection('product_categories', ref =>
      ref.where('parentId', '==', parentId).orderBy('weight'));
    return categories.valueChanges();
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

  updateProduct(id: string, refs?: string[]): void {
   if (refs !== undefined) {
     this.productCollection.doc(id).update({
       id,
       img: refs
     })
       .catch(error => console.log(error));
   } else {
     this.productCollection.doc(id).update({
       id
     })
       .catch(error => console.log(error));
   }
  }
}
