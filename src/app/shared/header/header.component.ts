import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../user/user.interface';
import { UserService } from '../../user/user.service';
import { Product } from '../../products/product.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  products$: Observable<Product[]> = this.user.getUserProducts();

  constructor(
    public auth: AuthService,
    private user: UserService,
    public ngxSmartModalService: NgxSmartModalService
  ) { }
}
