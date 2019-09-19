import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist-btn',
  templateUrl: './wishlist-btn.component.html',
  styleUrls: ['./wishlist-btn.component.scss']
})
export class WishlistBtnComponent implements OnInit {
  wishProducts: string;
  isProductInWishlist: boolean;
  @Input() productId: string;

  constructor() {}

  ngOnInit() {
    // this.isProductInWishlist = this.checkProductInWishlist();
  }

  checkProductInWishlist(): boolean {
    this.wishProducts = localStorage.getItem('wishProducts');
    if (this.wishProducts === null) {
      return false;
    } else {
      const parsedWishProducts = JSON.parse(this.wishProducts);
      const arr = Object.values(parsedWishProducts);
      console.log('check', arr.includes(this.productId));
      return arr.includes(this.productId);
    }
  }

  addToWishlist() {
    if (this.wishProducts === null) {
      localStorage.setItem('wishProducts', JSON.stringify([this.productId]));
    } else {
      const parsedWishProducts = JSON.parse(this.wishProducts);
      parsedWishProducts[parsedWishProducts.length] = this.productId;
      localStorage.setItem('wishProducts', JSON.stringify(parsedWishProducts));
    }
  }

  removeFromWishlist() {
    const parsedWishProducts = JSON.parse(this.wishProducts);
    const arr = Object.values(parsedWishProducts);
    const index = arr.indexOf(this.productId);
    arr.splice(index, 1);
    localStorage.setItem('wishProducts', JSON.stringify(arr));
  }
}
