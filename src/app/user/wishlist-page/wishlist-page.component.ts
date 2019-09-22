import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../app.interfaces';
import { FirestoreService } from '../../shared/services/firestore.service';
import { WishlistService } from '../../products/wishlist-btn/wishlist.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistPageComponent implements OnInit {
  wishedProducts: Observable<Product[]>;
  wishedProductIds: Array<string>;
  msg: string;

  constructor(private db: FirestoreService, private wishlistService: WishlistService) { }

  ngOnInit() {
    this.wishedProductIds = this.wishlistService.getProductIds();
    if (this.wishedProductIds.length === 0) {
      this.msg = 'Пока пусто';
    } else {
      this.wishedProducts = this.db.getProductsByIds(this.wishedProductIds);
    }
  }

  handleRemoveFromWishlist($event: string) {
    this.wishedProductIds = this.wishlistService.getProductIds();
    if (this.wishedProductIds.length === 0) {
      this.msg = 'Пока пусто';
    }
    this.wishedProducts = this.db.getProductsByIds(this.wishedProductIds);
  }
}
