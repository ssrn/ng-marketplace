import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller/seller.component';
import { ProductPageComponent } from './product-page.component';
import { ProductPageRoutingModule } from './product-page-routing.module';
import { NgxGalleryModule } from 'ngx-gallery';


@NgModule({
  declarations: [
    ProductPageComponent,
    SellerComponent
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    NgxGalleryModule
  ],
  bootstrap: [ProductPageComponent]
})

export class ProductPageModule { }
