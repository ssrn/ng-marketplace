import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid: Observable<string | null>;
  private userCollection: AngularFirestoreCollection;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.userCollection = db.collection('users');

    this.uid = this.afAuth.authState.pipe(
      map(authState => authState ? authState.uid  : null)
    );
  }
  // TODO Fix always true -- Observable !== null
  get authenticated(): boolean {
    console.log('this.uid', this.uid);
    return this.uid !== null;
  }

  login(email: string, password: string): void {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
      })
      .then(credential => {
        if (credential) {
          this.router.navigate(['']);
        }
      });
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  createUser(user): void {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        // this.SendVerificationMail();
        this.setUserData(result.user)
          .catch((error) => {
            window.alert(error.message);
          });
      }).catch((error) => {
      window.alert(error.message);
    });
  }

  private setUserData(user): Promise<void | DocumentReference> {
    const userData = {
      uid: user.uid,
      email: user.email,
    };
    return this.userCollection.add(userData)
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
