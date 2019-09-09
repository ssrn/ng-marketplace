import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    SharedModule,
  ],
  providers: [AngularFirestore, AngularFireStorage],
  bootstrap: [AppComponent]
})

export class AppModule {}
