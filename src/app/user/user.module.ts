import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from '../products/products.module';
import { UserRoutingModule } from './user-routing.module';
import { MyProductsComponent } from './my-products/my-products.component';
import { MyProductActionsComponent } from './my-products/my-product-actions/my-product-actions.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthModule } from '../auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyProductsComponent,
    MyProductActionsComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ProductsModule,
    AuthModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
