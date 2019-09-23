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
  newUser: any;
  private userCollection: AngularFirestoreCollection;
  uid: Observable<string | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {

    this.userCollection = db.collection('users');
    this.uid = this.afAuth.authState.pipe(
      map(authState => authState ? authState.uid  : null)
    );
  }

  login( email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
      })
      .then(userRights => {
        if (userRights) {
          this.router.navigate(['']);
        }
      });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  createUser(user) {
    console.log(user);
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

  setUserData(user): Promise<void | DocumentReference> {
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
