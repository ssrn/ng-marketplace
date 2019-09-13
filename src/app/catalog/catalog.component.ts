import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FirestoreSearchQuery } from '../shared/services/firestoreSearchQuery.interface';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class CatalogComponent implements OnDestroy {
  searchQuery: FirestoreSearchQuery;
  url: string[];
  subscription: Subscription;

  constructor(
    private router: Router,
  ) {
    this.subscription = router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.url = this.router.url.split('/');

        if (this.url.length < 4) {
          this.searchQuery = {where: [{fieldPath: 'category.parentId', opStr: '==', value: this.url[this.url.length - 1]}]};
        } else {
          this.searchQuery = {where: [{fieldPath: 'category.id', opStr: '==', value: this.url[this.url.length - 1]}]};
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
