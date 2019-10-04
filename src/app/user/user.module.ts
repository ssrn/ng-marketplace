import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from '../products/products.module';
import { UserRoutingModule } from './user-routing.module';
import { MyProductsComponent } from './my-products/my-products.component';
import { MyProductActionsComponent } from './my-products/my-product-actions/my-product-actions.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthModule } from '../auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { OrdersComponent } from './orders/orders.component';
import { ReactiveValidationModule } from 'angular-reactive-validation';
import { SellerProductsComponent } from './seller-products/seller-products.component';


@NgModule({
  declarations: [
    MyProductsComponent,
    MyProductActionsComponent,
    ProfileComponent,
    UserMenuComponent,
    OrdersComponent,
    SellerProductsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ProductsModule,
    AuthModule,
    ReactiveFormsModule,
    ReactiveValidationModule
  ],
})
export class UserModule { }
