import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WishlistBtnModeEnum } from '../products/wishlist-btn/wishlist-btn-mode.enum';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/product.interface';
import { WishlistService } from '../products/wishlist-btn/wishlist.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistPageComponent implements OnInit {
  wishedProducts$: Observable<Product[]>;
  wishedProductIds: Array<string>;
  msg: string;
  wishlistBtnMode: WishlistBtnModeEnum = WishlistBtnModeEnum.Trash;

  constructor(
    private productsService: ProductsService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit() {
    this.wishedProductIds = this.wishlistService.getProductIds();
    if (this.wishedProductIds.length === 0) {
      this.msg = 'Пока пусто';
    } else {
      this.wishedProducts$ = this.productsService.getProductsByIds(this.wishedProductIds);
    }
  }

  handleRemoveFromWishlist($event: string) {
    this.wishedProductIds = this.wishlistService.getProductIds();
    if (this.wishedProductIds.length === 0) {
      this.msg = 'Пока пусто';
    }
    this.wishedProducts$ = this.productsService.getProductsByIds(this.wishedProductIds);
  }
}
