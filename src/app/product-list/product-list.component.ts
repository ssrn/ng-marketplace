import {Component, Input, OnInit} from '@angular/core';
import { Product } from '../shared/product.interfaces';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [
    {
      category: '',
      img: './assets/images/product-images/strawberry.jpg',
      name: 'Клубника',
      price: 250,
      desc: '',
      metro: ''
    },
    {
      category: '',
      img: './assets/images/product-images/cucumber.png',
      name: 'Огурцы хрустящие',
      price: 80,
      desc: 'Выращены в экологически чистом районе. Хрустящие, не горчат. Огурцы привычный для нас овощ,' +
        ' без которого невозможно представить многие салаты. Также их широко используют для соления.' +
        ' Огурцы на 95% состоят из воды, поэтому содержат мало калорий и идеально подходят для диетического питания.' +
        ' Благодаря содержанию ферментов они способствуют усвоению животных белков. Огурцы нужны в нашем рационе,' +
        ' так как содержат важные для организма питательные вещества.',
      metro: ''
    },
    {
      category: '',
      img: './assets/images/product-images/apples.jpg',
      name: 'Яблоки «Ред Делишес»',
      price: 90,
      desc: '',
      metro: ''
    },
    {
      category: '',
      img: './assets/images/product-images/apples.jpg',
      name: 'Яблоки молодые белый налив',
      price: 65,
      desc: '',
      metro: ''
    }
  ];

  @Input() title: object;
  @Input() titleTagClass: string;

  constructor() {
  }

  ngOnInit() {
  }
}
