import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { MainPageRoutingModule } from '../main-page/main-page-routing.module';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule
  ],
  exports: [
    ProductListComponent,
    ProductCardComponent
  ]
})

export class ProductsModule { }
