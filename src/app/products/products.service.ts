import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { Category } from '../catalog/categories-menu/category.interface';
import { Product } from './product.interface';
import OrderByDirection = firebase.firestore.OrderByDirection;
import { flatMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private productCollection: AngularFirestoreCollection<Product>;
  uid$: Observable<string> = this.auth.uid$;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private auth: AuthService,
  ) {
    this.productCollection = db.collection('products');
  }

  addProduct(product: Product): Promise<DocumentReference> {
    return this.productCollection.add(product);
  }

  uploadProductPhotos(files: FileList): void {
    Array.from(files).map(file => {
      const filePath = `products/${file.name}`;
      this.storage.ref(filePath).put(file)
        .catch(error => console.log(error));
    });
  }

  getProduct(id: string): Observable<Product> {
    return this.productCollection.doc<Product>(id).valueChanges();
  }

  getProducts(): Observable<Product[]> {
    return this.db.collection<Product>('products').valueChanges();
  }

  getPromotedProducts(
    limit?: number,
  ): Observable<Product[]> {
    return this.db.collection<Product>('products', ref => {
      let query = ref.where('promoted', '==', true);
      if (limit) {
        query = query.limit(limit);
      }
      return query;
    })
      .valueChanges();
  }

  getPublishedProductsByCategory(
    isMainCategory: boolean,
    value: any,
    withPhoto?: boolean,
    orderByDirection?: false | OrderByDirection
  ): Observable<Product[]> {
    return this.db.collection<Product>('products', ref => {
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
    })
      .valueChanges();
  }

  getProductsByIds(ids: string[]): Observable<Product[]> {
    return combineLatest(ids.map(id => this.getProduct(id)));
  }

  getCurrentUserProducts(): Observable<Product[]> {
    return this.uid$.pipe(
      flatMap( (uid) =>
        this.db.collection<Product>('products', ref =>
          ref.where('uid', '==', uid))
          .valueChanges()
      )
    );
  }

  getSellerProducts(uid: string): Observable<Product[]> {
    return this.db.collection<Product>('products', ref =>
      ref.where('uid', '==', uid))
      .valueChanges();
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

    this.productCollection.doc<Product>(id).update(data)
      .catch(error => console.log(error));
  }

  removeProduct(id: string): void {
    this.productCollection.doc<Product>(id).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }

  publishProduct(id: string): void {
    this.productCollection.doc<Product>(id).update({
      published: true
    }).then(() => {
      console.log('Document successfully published!');
    }).catch((error) => {
      console.error('Error publishing document: ', error);
    });
  }

  unpublishProduct(id: string): void {
    this.productCollection.doc<Product>(id).update({
      published: false
    }).then(() => {
      console.log('Document successfully unpublished!');
    }).catch((error) => {
      console.error('Error unpublishing document: ', error);
    });
  }

  getProductCategories(): Observable<Category[]> {
    return this.db.collection<Category>('product_categories', ref => ref.orderBy('weight'))
    .valueChanges();
  }
}
