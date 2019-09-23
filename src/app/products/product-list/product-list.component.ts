import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
import { Product } from '../../app.interfaces';
import { FirestoreSearchQuery } from '../firestoreSearchQuery.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductListComponent {
  ngForTrackBy: TrackByFunction<string>;
  @Input() products: Product[];
  @Input() title: string;
  @Input() titleTagClass: string;
  @Input() searchQuery: FirestoreSearchQuery;
  @Input() isWishlistPage: boolean;
  @Output() remove: EventEmitter<string> = new EventEmitter();

  handleRemoveFromWishlist($event: string) {
    this.remove.emit($event);
  }
}
