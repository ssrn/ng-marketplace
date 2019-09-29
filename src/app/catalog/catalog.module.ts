import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { ProductsModule } from '../products/products.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CategoriesMenuComponent } from './categories-menu/categories-menu.component';
import { CatalogTopComponent } from './catalog-filters/catalog-top.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CatalogComponent, CategoriesMenuComponent, CatalogTopComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    ProductsModule,
    FormsModule
  ]
})

export class CatalogModule {}
