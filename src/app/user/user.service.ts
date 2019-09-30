import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  uid$: Observable<string> = this.auth.uid$;

  constructor(
    private auth: AuthService,
    private products: AngularFirestore,
  ) {}

  getCurrentUser(): Observable<User[]> {
    return this.uid$.pipe(
      switchMap( (uid) =>
        this.products.collection<User>('users', ref =>
          ref.where('uid', '==', uid))
          .valueChanges()
      )
    );
  }

  getSeller(uid): Observable<User[]> {
    return this.products.collection<User>('users', ref =>
      ref.where('uid', '==', uid))
      .valueChanges();
  }
}
