import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category } from './category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesMenuService {

  constructor(private db: AngularFirestore) { }

  getSubcategoriesMenu(parentId: string): Observable<Category[]> {
    return this.db.collection<Category>('product_categories', ref =>
      ref.where('parentId', '==', parentId).orderBy('weight'))
      .valueChanges();
  }
}
