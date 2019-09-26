import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FirestoreService } from '../products/firestore.service';
import { flatMap, map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../app.interfaces';
import { FirestoreSearchQuery } from '../products/firestoreSearchQuery.interface';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(
    private auth: AuthService,
    private db: AngularFirestore,
    private firestoreService: FirestoreService,
  ) {}

  getUser() {
    const func = (uid) => {
      return this.db.collection('users', ref =>
        ref.where('uid', '==', uid)).valueChanges();
    };
    return this.checkUidAndDo(func);
  }

  getUserProducts(): Observable<Product[]> {
    const func = (uid) => {
      const searchQuery: FirestoreSearchQuery = {where: [{fieldPath: 'uid', opStr: '==', value: uid}]};
      return this.firestoreService.getPublishedProducts(searchQuery);
    };
    return this.checkUidAndDo(func);
  }

  private checkUidAndDo(func): Observable<any> {
    return this.auth.uid.pipe(
      flatMap(uid => {
        if (uid === null) {
          return null;
        }
        return func(uid);
      })
    );
  }
}
