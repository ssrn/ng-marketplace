import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid$: Observable<string>;
  private userCollection: AngularFirestoreCollection;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.userCollection = db.collection('users');

    this.uid$ = this.auth.authState.pipe(
      map(authState => {
        if (authState) {
          return authState.uid;
        }
        return null;
      })
    );
  }

  login(email: string, password: string): void {
    this.auth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
      })
      .then(credential => {
        if (credential) {
          this.router.navigate(['']);
        }
      });
  }

  logout() {
    this.auth.auth.signOut();
    this.router.navigate(['/']);
  }

  createUser(user): void {
    this.auth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        // this.sendVerificationMail();
        this.setUserData(result.user)
          .catch((error) => {
            window.alert(error.message);
          });
      }).catch((error) => {
      window.alert(error.message);
    });
  }

  private sendVerificationMail() {
    return this.auth.auth.currentUser.sendEmailVerification();
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
