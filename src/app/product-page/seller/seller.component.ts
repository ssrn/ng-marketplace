import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../user/user.interface';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})

export class SellerComponent implements OnInit {
  @Input() uid: string;
  seller$: Observable<User[]>;
  isPhoneShown = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.seller$ = this.userService.getSeller(this.uid);
  }

  handlePhone() {
    this.isPhoneShown = !this.isPhoneShown;
  }
}
