import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { ProductsModule } from '../products/products.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CategoriesMenuComponent } from './categories-menu/categories-menu.component';


@NgModule({
  declarations: [CatalogComponent, CategoriesMenuComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    ProductsModule
  ],
  bootstrap: [CatalogComponent]
})

export class CatalogModule {}
