import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { MainPageComponent } from './main-page.component';
import { MainBannerComponent } from './main-banner/main-banner.component';
import { MainPageRoutingModule } from './main-page-routing.module';

@NgModule({
  declarations: [
    MainPageComponent,
    MainBannerComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule
  ],
  bootstrap: [MainPageComponent]
})

export class MainPageModule { }
