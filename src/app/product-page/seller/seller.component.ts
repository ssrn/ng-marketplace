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
  sellerPhoto$;

  constructor(
    private userService: UserService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.seller$ = this.userService.getSeller(this.uid);
    this.sellerProducts$ = this.productsService.getSellerProducts(this.uid);
    // this.sellerPhoto$ = this.seller$.pipe(
    //   concatMap((seller) => {
    //     // console.log('x', seller);
    //     return this.userService.getUserPhoto(seller[0].photo);
    //   })
    // );
    this.seller$.subscribe((seller) => {
      this.sellerPhoto$ = this.userService.getUserPhoto(seller[0].photo);
    });
  }

  handlePhone() {
    this.isPhoneShown = !this.isPhoneShown;
  }
}
