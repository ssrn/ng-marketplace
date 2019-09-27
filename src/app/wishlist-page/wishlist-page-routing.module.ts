import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistPageComponent } from './wishlist-page.component';

const routes: Routes = [
  { path: '', component: WishlistPageComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class  WishlistPageRoutingModule { }
