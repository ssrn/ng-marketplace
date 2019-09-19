import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsRoutingModule } from './products-routing.module';
import { WishlistBtnComponent } from './wishlist-btn/wishlist-btn.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    WishlistBtnComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductListComponent,
    ProductCardComponent,
    WishlistBtnComponent
  ]
})

export class ProductsModule { }
