import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Menu } from './menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MainMenuService {
  private menuCollection: AngularFirestoreCollection<Menu>;

  constructor(private db: AngularFirestore) {
    this.menuCollection = db.collection<Menu>('menu', ref => ref.orderBy('weight'));
  }

  getMainMenu(): Observable<Menu[]> {
    return this.menuCollection.valueChanges();
  }
}
