import {Component, Input, OnInit} from '@angular/core';
import { Product } from './product-list.interfaces';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [
    {
      name: 'Клубника',
      price: 250,
    },
    {
      name: 'Огурцы',
      price: 80,
    }
  ];

  @Input() title: object;
  @Input() titleTagClass: string;

  constructor() {
  }

  ngOnInit() {
  }
}
