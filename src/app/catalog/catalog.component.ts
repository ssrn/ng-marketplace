import { Component, NgIterable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FirestoreService } from '../products/firestore.service';
import { Product } from '../products/product.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})

export class CatalogComponent implements OnDestroy {
  products: Observable<Product[]>;
  url: string[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private db: FirestoreService,
  ) {
    this.subscription = router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.url = this.router.url.split('/');

        if (this.url.length < 4) {
          this.products = this.db.getPublishedProductsByMainCategory(this.url[this.url.length - 1]);
        } else {
          this.products = this.db.getPublishedProductsBySubCategory(this.url[this.url.length - 1]);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleSortByPopularity($event) {
    console.log($event);
  }

  handleSortFromLowToHigh($event) {
    console.log($event);
  }

  handleSortFromHighToLow($event) {
    console.log($event);
  }
}
