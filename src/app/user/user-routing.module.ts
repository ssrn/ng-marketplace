import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'wishlist', component: WishlistPageComponent },
  { path: 'my-products', component: MyProductsComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class  UserRoutingModule { }
