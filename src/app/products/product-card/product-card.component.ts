import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Product } from '../../app.interfaces';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductCardComponent implements OnInit {
  photoUrl: Observable<string[]>;
  @Input() product: Product;
  @Input() isWishlistPage: boolean;
  @Output() remove: EventEmitter<string> = new EventEmitter();

  constructor( private db: FirestoreService ) { }

  ngOnInit() {
    if (this.product.img !== null) {
      this.photoUrl = this.db.getProductPhotos(this.product.img);
    }
  }

  handleRemoveFromWishlist($event) {
    this.remove.emit(this.product.id);
  }
}
