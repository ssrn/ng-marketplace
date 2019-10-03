import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  uid$: Observable<string> = this.auth.uid$;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(
    private auth: AuthService,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
  ) {
    this.userCollection = db.collection('users');
  }

  getCurrentUser(): Observable<User[]> {
    return this.uid$.pipe(
      switchMap( (uid) =>
        this.db.collection<User>('users', ref =>
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

  getUserPhoto(path: string): Observable<string> {
    const ref = this.storage.ref(path);
    return ref.getDownloadURL();
  }

  updateUser(id: string): void {
    const data = {};

    this.userCollection.doc<User>(id).update(data)
      .catch(error => console.log(error));
  }
}
