import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, QuerySnapshot} from '@angular/fire/firestore';
import { FirestoreService } from '../services/firestore.service';
import { Product } from '../shared/product.interfaces';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;

  @Input() title: object;
  @Input() titleTagClass: string;

  constructor(private afs: FirestoreService) {
  }

  ngOnInit() {
    this.products = this.afs.getProducts();
  }
}

