import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { Product } from '../../app.interfaces';
import { WishlistService } from '../wishlist-btn/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss', '../product-list/product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class ProductCardComponent implements OnInit {
  photoUrl: Observable<string[]>;
  @Input() product: Product;
  @Input() isWishlistPage: boolean;
  @Output() remove: EventEmitter<string> = new EventEmitter();

  constructor(
    private db: FirestoreService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit() {
    if (this.product.img !== null) {
      this.photoUrl = this.db.getProductPhotos(this.product.img);
    }
  }

  checkProductInWishlist(): boolean {
    return this.wishlistService.checkProduct(this.product.id);
  }

  handleAddToWishlist($event) {
    return this.wishlistService.addProduct(this.product.id);
  }

  handleRemoveFromWishlist($event) {
    this.wishlistService.removeProduct(this.product.id);
    if (this.isWishlistPage) {
      this.remove.emit(null);
    }
  }
}
