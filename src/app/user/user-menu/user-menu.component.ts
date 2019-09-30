import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../products/product.interface';
import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  products$: Observable<Product[]> = this.user.getUserProducts();

  constructor(
    private user: UserService,
    private auth: AuthService,
  ) { }

  handleLogout() {
    this.auth.logout();
  }
}
