import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from '../app-routing.module';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    LoginDialogComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxSmartModalModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    LoginDialogComponent
  ]
})

export class SharedModule { }
