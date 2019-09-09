import { ChangeDetectionStrategy, Component, Input, OnInit, TrackByFunction } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Observable } from 'rxjs';
import { Product } from '../../app.interfaces';
import { FirestoreSearchQuery } from '../../services/firestoreSearchQuery.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;
  ngForTrackBy: TrackByFunction<any>;

  @Input() title: string;
  @Input() titleTagClass: string;
  @Input() searchQuery: FirestoreSearchQuery;

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    this.products = this.db.getProducts(this.searchQuery);
  }
}
