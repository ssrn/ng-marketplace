import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/product.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainPageComponent {
  products$: Observable<Product[]>;

  constructor(
    private productsService: ProductsService,
  ) {
    this.products$ = this.productsService.getPublishedProducts(4);
  }
}
