import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { style } from '@angular/animations';

@Component({
  selector: 'app-wishlist-btn',
  templateUrl: './wishlist-btn.component.html',
  styleUrls: ['./wishlist-btn.component.scss']
})
export class WishlistBtnComponent implements OnInit {
  wishProducts: string;
  btnTitle: string;
  isWishlistPage: boolean;
  @Input() productId: string;
  @Input() parent: any;

  constructor(private router: Router, private vcr: ViewContainerRef) {}

  ngOnInit() {
    this.isWishlistPage = this.router.url === '/wishlist';
    this.btnTitle = this.checkProductInWishlist() ? 'Удалить из избранного' : 'Добавить в избранное';
  }

  checkProductInWishlist(): boolean {
    this.wishProducts = localStorage.getItem('wishProducts');
    if (this.wishProducts === null) {
      return false;
    } else {
      const parsedWishProducts = JSON.parse(this.wishProducts);
      const arr = Object.values(parsedWishProducts);
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

    if (this.isWishlistPage) {

    }
  }
}
