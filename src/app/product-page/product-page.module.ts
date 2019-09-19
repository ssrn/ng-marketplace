import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller/seller.component';
import { ProductPageComponent } from './product-page.component';
import { ProductPageRoutingModule } from './product-page-routing.module';
import { NgxGalleryModule } from 'ngx-gallery';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    ProductPageComponent,
    SellerComponent
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    NgxGalleryModule,
    ProductsModule
  ],
  bootstrap: [ProductPageComponent]
})

export class ProductPageModule { }
