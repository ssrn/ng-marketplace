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
  products: Observable<Product[]>;

  constructor(
    private db: ProductsService,
  ) {
    this.products = this.db.getPublishedProducts(4);
  }
}
