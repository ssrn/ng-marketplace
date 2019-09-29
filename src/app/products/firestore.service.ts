import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { Category } from '../catalog/categories-menu/category.interface';
import { Product } from './product.interface';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private productCollection: AngularFirestoreCollection<Product>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
  ) {
    this.productCollection = db.collection('products');
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

  getPublishedProducts(
    limit?: number,
  ): Observable<Product[]> {
    const products: AngularFirestoreCollection<Product> = this.db.collection('products', ref => {
      let query = ref.where('published', '==', true);
      if (limit) {
        query = query.limit(limit);
      }
      return query;
    });
    return products.valueChanges();
  }

  getPublishedProductsByCategory(
    isMainCategory: boolean,
    value,
    withPhoto?: boolean,
    orderByDirection?: false | OrderByDirection
  ): Observable<Product[]> {
    const products: AngularFirestoreCollection<Product> = this.db.collection('products', ref => {
      const fieldPath = isMainCategory ? 'category.parentId' : 'category.id';
      let query = ref.where(fieldPath, '==', value)
        .where('published', '==', true);
      if (withPhoto === true) {
        query = query.where('hasPhotos', '==', true);
      }
      if (orderByDirection) {
        query = query.orderBy('price', orderByDirection);
      }
      return query;
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

  getProductPhotos(paths: string[]): Observable<string[]> {
    return forkJoin(paths.map(path => {
      const ref = this.storage.ref(path);
      return ref.getDownloadURL();
    }));
  }

  updateProduct(id: string, photoUrls?: string[]): void {
    let data: {};
    if (photoUrls !== undefined) {
      data = {
        id,
        hasPhotos: true,
        photos: photoUrls,
      };
    } else {
      data = {
        id,
        hasPhotos: false,
      };
    }

    this.productCollection.doc(id).update(data)
      .catch(error => console.log(error));
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
}
