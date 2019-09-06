import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../app.interfaces';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  photoUrl: Observable<string>;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private db: FirestoreService
  ) { }

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.db.getProduct(params.get('id'))
        .subscribe(data => {
          this.product = data;
          this.photoUrl = this.db.downloadPhoto(this.product.img[0]);
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
