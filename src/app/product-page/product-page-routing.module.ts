import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductPageComponent } from './product-page.component';


const routes: Routes = [
  { path: '', component: ProductPageComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class  ProductPageRoutingModule { }
