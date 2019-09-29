import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { flatMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
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

  getUser(): Observable<User> {
    const func = (uid) => {
      return this.db.collection('users', ref =>
        ref.where('uid', '==', uid)).valueChanges();
    };
    return this.checkUidAndDo(func);
  }

  getUserProducts(): Observable<Product[]> {
    const func = (uid) => {
      return this.db.collection('products', ref =>
        ref.where('uid', '==', uid)).valueChanges();
    };
    return this.checkUidAndDo(func);
  }

  private checkUidAndDo(func): Observable<any> {
    return this.auth.uid$.pipe(
      flatMap(uid => {
        if (uid === null) {
          return null;
        }
        return func(uid);
      })
    );
  }
}
