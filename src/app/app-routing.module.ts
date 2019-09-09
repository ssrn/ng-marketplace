import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule),
  },
  {
    path: ':url',
    loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then(m => m.AddProductModule)
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./product-page/product-page.module').then(m => m.ProductPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
