import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../shared/product.interfaces';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  constructor(private afs: AngularFirestore) {}

  addProduct(product: Product): Promise<DocumentReference> {
    return this.afs.collection('products').add(product);
  }

  getProducts() {
    return this.afs.collection<Product>('products').valueChanges();
  }
}
