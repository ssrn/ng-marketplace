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

  uploadPhotos(files: FileList) {
    Array.from(files).forEach(file => {
      const filePath = `products/${file.name}`;
      this.storage.ref(filePath).put(file)
        .catch(error => console.log(error));
    });
  }

  downloadPhotos(path: string) {
    const ref = this.storage.ref(path);
    return ref.getDownloadURL();
  }

  updateProduct(id: string, refs: string[]) {
    this.productCollection.doc(id).update({
        img: refs
      })
      .catch(error => console.log(error));
  }
}
