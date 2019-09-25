import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WishlistBtnModeEnum } from './wishlist-btn-mode.enum';

@Component({
  selector: 'app-wishlist-btn',
  templateUrl: './wishlist-btn.component.html',
  styleUrls: ['./wishlist-btn.component.scss'],
})
export class WishlistBtnComponent implements OnInit {
  @Input() productId: string;
  @Input() productInWishlist: string;
  wishlistBtnModeEnum = WishlistBtnModeEnum;
  @Input() wishlistBtnMode: WishlistBtnModeEnum;
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    console.log('this.wishlistBtnMode', this.wishlistBtnMode);
  }

  get btnTitle(): string {
    return this.productInWishlist ? 'Удалить из избранного' : 'Добавить в избранное';
  }

  handleClick() {
    return this.productInWishlist ? this.removeFromWishlist() : this.addToWishlist();
  }

  addToWishlist(): void {
    this.add.emit(null);
  }

  removeFromWishlist(): void {
    this.remove.emit(null);
  }
}
