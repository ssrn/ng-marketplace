import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { WishlistBtnModeEnum } from '../../products/wishlist-btn/wishlist-btn-mode.enum';
import { ProductsService } from '../../products/products.service';
import { Product } from '../../products/product.interface';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})

export class MyProductsComponent implements OnInit {
  userProducts$: Observable<Product[]>; // = this.user.getUserProducts();
  wishlistBtnMode: WishlistBtnModeEnum = WishlistBtnModeEnum.None;

  constructor(
    private products: ProductsService
  ) { }

  ngOnInit() {
    this.userProducts$ = this.products.getCurrentUserProducts();
  }

  identify(index: number, item: Product): string {
    return item.id;
  }

  handleRemove($event: string, id: string) {
    return this.products.removeProduct(id);
  }

  handleUnpublish($event: string, id: string) {
    return this.products.unpublishProduct(id);
  }

  handlePublish($event: string, id: string) {
    return this.products.publishProduct(id);
  }
}
