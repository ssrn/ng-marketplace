import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AppRoutingModule } from '../app-routing.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { MainMenuTriggerComponent } from './main-menu-trigger/main-menu-trigger.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainMenuComponent,
    MobileMenuComponent,
    MainMenuTriggerComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxSmartModalModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    MobileMenuComponent
  ]
})

export class SharedModule { }
