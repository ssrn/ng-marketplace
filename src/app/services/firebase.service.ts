import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../shared/product.interfaces';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  product: Observable<Product[]>;

  constructor(private firestore: AngularFirestore) {}

  addProduct(product: Product) {
    return this.firestore.collection('products').add(product);
  }
}
