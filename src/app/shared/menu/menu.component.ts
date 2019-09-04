import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  productCategories;

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    this.productCategories = this.db.getCategories();
    console.log('this.productCategories', this.productCategories.subscribe(x => console.log('x', x)));
  }
}
