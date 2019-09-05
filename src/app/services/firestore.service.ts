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

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private productCollection: AngularFirestoreCollection<Product>;
  private categoryCollection: AngularFirestoreCollection;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.productCollection = db.collection<Product>('products');
    this.categoryCollection = db.collection('product_categories', ref => ref.where('parentId', '==', ''));
  }


  addProduct(product: Product): Promise<DocumentReference> {
    return this.productCollection.add(product);
  }

  getProducts(): Observable<Product[]> {
    return this.productCollection.valueChanges();
  }

  getCategories(): Observable<DocumentData[]> {
    return this.categoryCollection.valueChanges();
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
