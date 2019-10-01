import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AppRoutingModule } from '../app-routing.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { MainMenuTriggerComponent } from './main-menu-trigger/main-menu-trigger.component';
import { SearchComponent } from './search/search.component';
import { NgAisHitsModule, NgAisInstantSearchModule, NgAisSearchBoxModule } from 'angular-instantsearch';

@NgModule({
  declarations: [
    HeaderComponent,
    MainMenuComponent,
    MobileMenuComponent,
    MainMenuTriggerComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxSmartModalModule,
    ReactiveFormsModule,
    NgAisInstantSearchModule,
    NgAisSearchBoxModule,
    NgAisHitsModule
  ],
  exports: [
    HeaderComponent,
    MobileMenuComponent
  ]
})

export class SharedModule { }
