import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductPageComponent } from './product-page/product-page.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule)
  },
  {
    path: 'catalog/:name',
    loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)
  },
  { path: 'add-product', component: AddProductComponent },
  { path: 'products/:id', component: ProductPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
