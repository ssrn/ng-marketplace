import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthModule } from './auth/auth.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { NgAisModule } from 'angular-instantsearch';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ReactiveValidationModule } from 'angular-reactive-validation';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgAisModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveValidationModule.forRoot({
      displayValidationMessageWhen: (control, formSubmitted) => {
        return formSubmitted;
      }
    })
  ],
  providers: [AngularFirestore, AngularFireStorage],
  bootstrap: [AppComponent]
})

export class AppModule {}
