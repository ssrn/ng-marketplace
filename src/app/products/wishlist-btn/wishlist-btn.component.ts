import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-wishlist-btn',
  templateUrl: './wishlist-btn.component.html',
  styleUrls: ['./wishlist-btn.component.scss'],
})
export class WishlistBtnComponent implements OnInit {
  btnTitle: string;
  @Input() productId: string;
  @Input() isHeartBtn: boolean;
  isTrashBtn: boolean = !this.isHeartBtn;
  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.btnTitle = this.getBtnTitle();
  }

  handleClick() {
    return this.checkProductInWishlist() ? this.removeFromWishlist() : this.addToWishlist();
  }

  checkProductInWishlist(): boolean {
    return this.wishlistService.checkProduct(this.productId);
  }

  addToWishlist(): void {
    this.btnTitle = this.getBtnTitle();
    return this.wishlistService.addProduct(this.productId);
  }

  removeFromWishlist(): void {
    this.wishlistService.removeProduct(this.productId);
    this.btnTitle = this.getBtnTitle();
    if (this.isTrashBtn) {
      this.remove.emit(null);
    }
  }

  getBtnTitle(): string {
    return this.checkProductInWishlist() ? 'Удалить из избранного' : 'Добавить в избранное';
  }
}
