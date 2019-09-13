import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, TrackByFunction } from '@angular/core';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Observable } from 'rxjs';
import { Product } from '../../app.interfaces';
import { FirestoreSearchQuery } from '../../shared/services/firestoreSearchQuery.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductListComponent implements OnInit, OnChanges {
  products: Observable<Product[]>;
  ngForTrackBy: TrackByFunction<string>;

  @Input() title: string;
  @Input() titleTagClass: string;
  @Input() searchQuery: FirestoreSearchQuery;

  constructor(
    private db: FirestoreService,
  ) {}

  ngOnInit() {
    this.products = this.db.getProducts(this.searchQuery).pipe(
      map(products => products)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.products = this.db.getProducts(changes.searchQuery.currentValue).pipe(
      map(products => products)
    );
  }
}
