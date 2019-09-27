import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistPageComponent } from './wishlist-page.component';
import { WishlistPageRoutingModule } from './wishlist-page-routing.module';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [WishlistPageComponent],
  imports: [
    CommonModule,
    WishlistPageRoutingModule,
    ProductsModule
  ]
})
export class WishlistPageModule { }
