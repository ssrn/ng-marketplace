import { Injectable } from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = localStorage.getItem('isLoggedIn');
  // if (localStorage.getItem(key)) {
  // isLoggedIn = false;
  // }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private db: AngularFirestore) {}

  login(user): Observable<object> {
    return this.db.collection('users', ref =>
    ref.where('email', '==', user.email).where('password', '==', user.password))
      .valueChanges();
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    // this.isLoggedIn = false;
  }
}
