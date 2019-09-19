import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../app.interfaces';
import { FirestoreService } from '../shared/services/firestore.service';
import { map } from 'rxjs/operators';

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
    this.products = this.db.getProducts({limit: 4}).pipe(
      map(product => product)
    );
  }
}
