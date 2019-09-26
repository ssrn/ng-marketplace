import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { Category, Menu, Product } from '../app.interfaces';
import { FirestoreSearchQuery } from './firestoreSearchQuery.interface';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private productCollection: AngularFirestoreCollection<Product>;
  private menuCollection: AngularFirestoreCollection<Menu>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
  ) {
    this.productCollection = db.collection('products');
    this.menuCollection = db.collection('menu', ref => ref.orderBy('weight'));
  }

  addProduct(product: Product): Promise<DocumentReference> {
    return this.productCollection.add(product);
  }

  uploadProductPhotos(files: FileList): void {
    Array.from(files).forEach(file => {
      const filePath = `products/${file.name}`;
      this.storage.ref(filePath).put(file)
        .catch(error => console.log(error));
    });
  }

  getProducts(searchQuery: FirestoreSearchQuery): Observable<Product[]> {
    const products: AngularFirestoreCollection<Product> = this.db.collection('products', ref => {
      if (searchQuery.where !== undefined) {
        return ref.where(searchQuery.where[0].fieldPath, searchQuery.where[0].opStr, searchQuery.where[0].value);
        // searchQuery.where.forEach(obj => {
        //   return ref.where(obj.fieldPath, obj.opStr, obj.value);
        // });
      }
      if (searchQuery.limit !== undefined) {
        return ref.limit(searchQuery.limit);
      }
      return ref;
    });
    return products.valueChanges();
  }

  getProduct(id: string): Observable<Product> {
    const afd: AngularFirestoreDocument<Product> = this.productCollection.doc(id);
    return afd.valueChanges();
  }

  getProductsByIds(ids: string[]): Observable<Product[]> {
    return combineLatest(ids.map(id => this.getProduct(id)));
  }

  getUserProducts(uid: string) {
    // const searchQuery = {where: [{fieldPath: 'category.parentId', opStr: '==', value: this.url[this.url.length - 1]}]};
    // this.getProducts()
    // const products: AngularFirestoreCollection<any> = this.db.collection('users', ref => {
    //   return ref.where('products', '==', value: this.url[this.url.length - 1]);
    // });
    // return products.valueChanges();
  }

  getProductPhotos(paths: string[]): Observable<string[]> {
    return forkJoin(paths.map(path => {
      const ref = this.storage.ref(path);
      return ref.getDownloadURL();
    }));
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

  removeProduct(id: string) {
    this.productCollection.doc(id).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }

  unpublishProduct(id: string) {
    this.productCollection.doc(id).update({
      published: false
    }).then(() => {
      console.log('Document successfully unpublished!');
    }).catch((error) => {
      console.error('Error unpublishing document: ', error);
    });
  }

  publishProduct(id: string) {
    this.productCollection.doc(id).update({
      published: true
    }).then(() => {
      console.log('Document successfully published!');
    }).catch((error) => {
      console.error('Error publishing document: ', error);
    });
  }

  getProductCategories(): Observable<Category[]> {
    const categories: AngularFirestoreCollection<Category> = this.db.collection('product_categories', ref => ref.orderBy('weight'));
    return categories.valueChanges();
  }

  getMainMenu(): Observable<Menu[]> {
    return this.menuCollection.valueChanges();
  }

  getSubcategoriesMenu(parentId: string): Observable<Category[]> {
    const categories: AngularFirestoreCollection<Category> = this.db.collection('product_categories', ref =>
      ref.where('parentId', '==', parentId).orderBy('weight'));
    return categories.valueChanges();
  }
}