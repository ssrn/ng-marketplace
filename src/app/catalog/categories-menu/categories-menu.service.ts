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
    const categories: AngularFirestoreCollection<Category> = this.db.collection('product_categories', ref =>
      ref.where('parentId', '==', parentId).orderBy('weight'));
    return categories.valueChanges();
  }
}
