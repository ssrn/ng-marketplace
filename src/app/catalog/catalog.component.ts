import { Component, NgIterable, OnDestroy } from '@angular/core';
import { FirestoreSearchQuery } from '../products/firestoreSearchQuery.interface';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FirestoreService } from '../products/firestore.service';
import { map } from 'rxjs/operators';
import { Product } from '../app.interfaces';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})

export class CatalogComponent implements OnDestroy {
  products: Observable<Product[]>;
  searchQuery: FirestoreSearchQuery;
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
          this.searchQuery = {where: [{fieldPath: 'category.parentId', opStr: '==', value: this.url[this.url.length - 1]}]};
        } else {
          this.searchQuery = {where: [{fieldPath: 'category.id', opStr: '==', value: this.url[this.url.length - 1]}]};
        }

        this.products = this.db.getProducts(this.searchQuery).pipe(
          map(product => product)
        );
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
