import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Observable } from 'rxjs';
import { Product } from '../app.interfaces';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;

  @Input() title: object;
  @Input() titleTagClass: string;

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    this.products = this.db.getProducts();
  }
}

