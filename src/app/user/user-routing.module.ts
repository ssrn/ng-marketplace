import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';
import { MyProductsComponent } from './my-products/my-products.component';

const routes: Routes = [
  { path: '', component: MyProductsComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class  UserRoutingModule { }
