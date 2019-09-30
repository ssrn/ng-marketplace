import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';
import { WishlistService } from '../wishlist-btn/wishlist.service';
import { WishlistBtnModeEnum } from '../wishlist-btn/wishlist-btn-mode.enum';
import { Product } from '../product.interface';

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
  @Input() wishlistBtnMode: WishlistBtnModeEnum;
  @Output() remove: EventEmitter<string> = new EventEmitter();

  constructor(
    private db: ProductsService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit() {
    if (this.product.photos) {
      this.photoUrl = this.db.getProductPhotos(this.product.photos);
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
    if (this.wishlistBtnMode === WishlistBtnModeEnum.Trash) {
      this.remove.emit(null);
    }
  }
}
