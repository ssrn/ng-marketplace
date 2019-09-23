import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthModule } from './auth/auth.module';
// import { Auth3Module } from './auth3/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgxSmartModalModule.forRoot(),
    SharedModule,
    AuthModule,
    // Auth3Module,
  ],
  providers: [AngularFirestore, AngularFireStorage],
  bootstrap: [AppComponent]
})

export class AppModule {}
