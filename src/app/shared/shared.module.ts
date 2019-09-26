import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { MainMenuComponent } from './menu/main-menu.component';
import { AppRoutingModule } from '../app-routing.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    MainMenuComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxSmartModalModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent
  ]
})

export class SharedModule { }
