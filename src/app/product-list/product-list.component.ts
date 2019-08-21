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
      url: './assets/images/product-images/strawberry.jpg',
      name: 'Клубника',
      price: 250,
    },
    {
      url: './assets/images/product-images/cucumber.png',
      name: 'Огурцы хрустящие',
      price: 80,
    },
    {
      url: './assets/images/product-images/apples.jpg',
      name: 'Яблоки «Ред Делишес»',
      price: 90,
    },
    {
      url: './assets/images/product-images/apples.jpg',
      name: 'Яблоки молодые белый налив',
      price: 65,
    }
  ];

  @Input() title: object;
  @Input() titleTagClass: string;

  constructor() {
  }

  ngOnInit() {
  }
}
