import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';
import { Product } from '../../app.interfaces';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  photoUrl: Observable<string | null>;

  constructor( private db: FirestoreService ) { }

  ngOnInit() {
    this.photoUrl = this.db.downloadPhoto(this.product.img[0]);
  }
}
