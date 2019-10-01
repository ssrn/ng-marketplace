import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private db: AngularFirestore) { }
  searchProducts(value) {
    return this.db.collection('products', ref => ref
      // .orderBy('name')
      .where('name', '==', value.input)
      // .startAt(value.input)
      // .endAt(value.input + '\uf8ff')
      .limit(5)
    ).valueChanges();
  }
}
