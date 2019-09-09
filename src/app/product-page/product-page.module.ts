import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller/seller.component';
import { ProductPageComponent } from './product-page.component';
import { ProductsRoutingModule } from '../products/products-routing.module';


@NgModule({
  declarations: [
    ProductPageComponent,
    SellerComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  bootstrap: [ProductPageComponent]
})

export class ProductPageModule { }
