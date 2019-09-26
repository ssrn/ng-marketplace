import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { Product } from '../../app.interfaces';
import { WishlistBtnModeEnum } from '../../products/wishlist-btn/wishlist-btn-mode.enum';
import { FirestoreService } from '../../products/firestore.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})

export class MyProductsComponent implements OnInit {
  userProducts: Observable<Product[]>;
  wishlistBtnMode: WishlistBtnModeEnum = WishlistBtnModeEnum.None;

  constructor(
    private userService: UserService,
    private db: FirestoreService
  ) { }

  ngOnInit() {
    this.userProducts = this.userService.getUserProducts();
  }

  identify(index: number, item: Product): string {
    return item.id;
  }

  handleRemove($event: string, id: string) {
    return this.db.removeProduct(id);
  }

  handleUnpublish($event: string, id: string) {
    return this.db.unpublishProduct(id);
  }

  handlePublish($event: string, id: string) {
    return this.db.publishProduct(id);
  }
}
