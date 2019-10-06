import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../products/product.interface';
import { ProductsService } from '../../products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.scss']
})
export class SellerProductsComponent {
  products$: Observable<Product[]>;
  uid: string;
  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {
    this.uid = this.router.url.split('/')[2];
    this.products$ = this.productsService.getSellerProducts(this.uid);
  }
}
