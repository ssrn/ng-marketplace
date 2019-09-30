import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../products/product.interface';
import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  products$: Observable<Product[]> = this.products.getCurrentUserProducts();

  constructor(
    private products: ProductsService,
    private auth: AuthService,
  ) { }

  handleLogout() {
    this.auth.logout();
  }
}
