import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product.component';
import { AddProductRoutingModule } from './add-product-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddProductComponent],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AddProductComponent],
})

export class AddProductModule {}
