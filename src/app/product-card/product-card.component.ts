import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/product.interfaces';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  photoUrl: Observable<string | null>;

  constructor( private db: FirestoreService ) { }

  ngOnInit() {
    this.photoUrl = this.db.downloadPhoto(this.product.img[0]);
  }
}
