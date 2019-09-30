import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { flatMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../products/product.interface';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(
    private auth: AuthService,
    private db: AngularFirestore,
  ) {}

  getUser(): Observable<User[]> {
    return this.db.collection<User>('users', ref =>
      ref.where('uid', '==', this.auth.uid))
      .valueChanges();
  }

  getUserProducts(): Observable<Product[]> {
    return this.db.collection<Product>('products', ref =>
      ref.where('uid', '==', this.auth.uid))
      .valueChanges();
  }

  getSeller(uid): Observable<User[]> {
    return this.db.collection<User>('users', ref =>
      ref.where('uid', '==', uid))
      .valueChanges();
  }
}
