import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';
import { ProductsModule } from '../products/products.module';
import { UserRoutingModule } from './user-routing.module';
import { MyProductsComponent } from './my-products/my-products.component';


@NgModule({
  declarations: [WishlistPageComponent, MyProductsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ProductsModule,
  ]
})
export class UserModule { }
