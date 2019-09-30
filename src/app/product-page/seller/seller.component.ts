import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../user/user.interface';
import { UserService } from '../../user/user.service';
import { Product } from '../../products/product.interface';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})

export class SellerComponent implements OnInit {
  @Input() uid: string;
  seller$: Observable<User[]>;
  isPhoneShown = false;
  sellerProducts$: Observable<Product[]>;

  constructor(
    private userService: UserService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.seller$ = this.userService.getSeller(this.uid);
    this.sellerProducts$ = this.productsService.getSellerProducts(this.uid);
  }

  handlePhone() {
    this.isPhoneShown = !this.isPhoneShown;
  }
}
