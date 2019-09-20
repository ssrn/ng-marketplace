import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../app.interfaces';
import { FirestoreService } from '../../shared/services/firestore.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {
  products: Observable<Product[]>;
  productIds: Array<string>;
  msg: string;

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    const wishProducts = localStorage.getItem('wishProducts');
    if (wishProducts === null || wishProducts === '[]') {
      this.msg = 'Пока пусто';
    } else {
      this.productIds = Object.values(JSON.parse(wishProducts));
      this.products = this.db.getProductsByIds(this.productIds);
    }
  }
}
