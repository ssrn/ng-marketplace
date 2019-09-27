import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  constructor(
    public auth: AuthService,
    public ngxSmartModalService: NgxSmartModalService
  ) { }
}
