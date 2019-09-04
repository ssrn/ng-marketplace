import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Product } from '../shared/product.interfaces';
import {Observable} from 'rxjs';

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

  getCategories() {
    return this.categoryCollection.valueChanges();
  }

  getProduct(id: string) {
    return this.productCollection.doc(id).get();
  }

  uploadPhotos(files: FileList) {
    Array.from(files).forEach(file => {
      const filePath = `products/${file.name}`;
      this.storage.ref(filePath).put(file)
        .catch(error => console.log(error));
    });
  }

  downloadPhoto(path: string) {
    const ref = this.storage.ref(path);
    return ref.getDownloadURL();
  }

  updateProduct(id: string, refs: string[]) {
    this.productCollection.doc(id).update({
        id,
        img: refs
      })
      .catch(error => console.log(error));
  }
}
