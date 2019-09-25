import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-wishlist-btn',
  templateUrl: './wishlist-btn.component.html',
  styleUrls: ['./wishlist-btn.component.scss'],
})
export class WishlistBtnComponent {
  @Input() productId: string;
  @Input() productInWishlist: string;
  @Input() isTrashBtn = false;
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor() {}

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
