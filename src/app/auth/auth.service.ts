import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user/user.interface';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  uid$: Observable<string>;
  uid: string;
  private userCollection: AngularFirestoreCollection;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.userCollection = db.collection('users');

    this.uid$ = this.auth.authState.pipe(
      map(authState => {
        if (authState) {
          this.uid = authState.uid;
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
      .then((resp) => {
        // this.sendVerificationMail();
        this.setUserData(resp.user, user)
          .then(() => this.toastr.success('Вы усепшно зарегистрированы', null, {
            timeOut: 3000
          }))
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

  private setUserData(respUser, user): Promise<void | DocumentReference> {
    const userData = {
      name: user.name,
      email: user.email,
      phone: '',
      photo: null,
      uid: respUser.uid,
    };

    return this.userCollection.add(userData)
      .then((resp) => {
        this.userCollection.doc<User>(resp.id).update({id: resp.id})
          .catch(error => console.log(error));
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
