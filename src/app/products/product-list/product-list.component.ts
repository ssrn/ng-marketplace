import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../app.interfaces';
import { FirestoreSearchQuery } from '../firestoreSearchQuery.interface';
import { WishlistBtnModeEnum } from '../wishlist-btn/wishlist-btn-mode.enum';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductListComponent {
  @Input() title: string;
  @Input() titleTagClass: string;
  @Input() products: Product[];
  @Input() listClass: string;
  @Input() searchQuery: FirestoreSearchQuery;
  @Input() wishlistBtnMode: WishlistBtnModeEnum = WishlistBtnModeEnum.Default;
  @Output() remove: EventEmitter<string> = new EventEmitter();

  handleRemoveFromWishlist($event: string) {
    this.remove.emit($event);
  }

  identify(index: number, item: Product): string {
    return item.id;
  }
}
