import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../products/firestore.service';
import { Product } from '../products/product.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainPageComponent {
  products: Observable<Product[]>;

  constructor(
    private db: FirestoreService,
  ) {
    this.products = this.db.getPublishedProducts({limit: 4});
  }
}
