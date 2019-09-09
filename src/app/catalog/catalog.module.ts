import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { ProductsModule } from '../products/products.module';
import { CatalogRoutingModule } from './catalog-routing.module';


@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    ProductsModule
  ],
  bootstrap: [CatalogComponent]
})

export class CatalogModule {}
