import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, TrackByFunction } from '@angular/core';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Observable } from 'rxjs';
import { Product } from '../../app.interfaces';
import { FirestoreSearchQuery } from '../../shared/services/firestoreSearchQuery.interface';
import { NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductListComponent implements OnInit, OnChanges {
  products: Observable<Product[]>;
  ngForTrackBy: TrackByFunction<string>;

  @Input() title: string;
  @Input() titleTagClass: string;
  @Input() searchQuery: FirestoreSearchQuery;

  constructor(
    private db: FirestoreService,
    private router: Router,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    // const searchQuery: SimpleChange = changes.searchQuery;
    // console.log('prev value: ', searchQuery.previousValue);
    // console.log('got name: ', searchQuery.currentValue);
    // this.searchQuery = searchQuery.currentValue;
  }

  ngOnInit() {
    this.products = this.db.getProducts(this.searchQuery).pipe(
      map(products => {
        // console.log('products', products);
        return products;
      })
    );
    // this.router.events.subscribe((val) => {
    //   if (val instanceof NavigationEnd) {
    //     console.log('this.products', this.products);
    //   }
    // });
  }
}
