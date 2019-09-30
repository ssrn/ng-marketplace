import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { flatMap, map, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../products/product.interface';
import { User } from './user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  uid$: Observable<string> = this.auth.uid$;
  constructor(
    private auth: AuthService,
    private db: AngularFirestore,
  ) {}

  getCurrentUser(): Observable<User[]> {
    return this.uid$.pipe(
      switchMap( (uid) =>
        this.db.collection<User>('users', ref =>
          ref.where('uid', '==', uid))
          .valueChanges()
      )
    );
  }

  getUserProducts(): Observable<Product[]> {
    return this.uid$.pipe(
      flatMap( (uid) =>
        this.db.collection<Product>('products', ref =>
          ref.where('uid', '==', uid))
          .valueChanges()
      )
    );
  }

  getSeller(uid): Observable<User[]> {
    return this.db.collection<User>('users', ref =>
      ref.where('uid', '==', uid))
      .valueChanges();
  }
}
