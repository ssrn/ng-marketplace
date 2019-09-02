import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Product } from '../shared/product.interfaces';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private productCollection: AngularFirestoreCollection<Product>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.productCollection = db.collection<Product>('products');
  }


  addProduct(product: Product): Promise<DocumentReference> {
    return this.productCollection.add(product);
  }

  getProducts() {
    return this.productCollection.valueChanges();
  }

  uploadPhotos(file) {
    const filePath = `products/${file.name}`;
    this.storage.ref(filePath).put(file)
      .then(snapshot => console.log('Uploaded a blob or file!'))
      .catch(error => console.log('error:', error));
  }

  downloadPhotos(path) {
    const ref = this.storage.ref(path);
    return ref.getDownloadURL();
  }

  updateProduct(id, ref) {
    this.productCollection.doc(id).update({
        img: ref
      });
  }
}
