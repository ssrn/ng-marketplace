import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MainPageModule } from './main-page/main-page.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AddProductComponent } from './add-product/add-product.component';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    ProductPageComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    SharedModule,
    MainPageModule
  ],
  providers: [AngularFirestore, AngularFireStorage],
  bootstrap: [AppComponent]
})

export class AppModule {}
