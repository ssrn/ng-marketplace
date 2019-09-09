import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller/seller.component';
import { ProductPageComponent } from './product-page.component';
import { ProductPageRoutingModule } from './product-page-routing.module';


@NgModule({
  declarations: [
    ProductPageComponent,
    SellerComponent
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule
  ],
  bootstrap: [ProductPageComponent]
})

export class ProductPageModule { }
