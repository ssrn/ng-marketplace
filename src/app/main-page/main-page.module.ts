import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page.component';
import { MainBannerComponent } from './main-banner/main-banner.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    MainPageComponent,
    MainBannerComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    ProductsModule
  ],
  bootstrap: [MainPageComponent]
})

export class MainPageModule { }
