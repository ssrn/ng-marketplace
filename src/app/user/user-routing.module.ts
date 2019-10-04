import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProductsComponent } from './my-products/my-products.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { AuthGuard } from '../auth/auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { SellerProductsComponent } from './seller-products/seller-products.component';

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'my-products', component: MyProductsComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: ':uid/products', component: SellerProductsComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class  UserRoutingModule { }
