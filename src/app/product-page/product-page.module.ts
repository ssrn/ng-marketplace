import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller/seller.component';
import { ProductPageComponent } from './product-page.component';
import { ProductPageRoutingModule } from './product-page-routing.module';
import { NgxGalleryModule } from 'ngx-gallery';
import { ProductsModule } from '../products/products.module';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductPageComponent,
    SellerComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    NgxGalleryModule,
    ProductsModule,
    ReactiveFormsModule,
  ],
  // bootstrap: [ProductPageComponent]
})

export class ProductPageModule { }
