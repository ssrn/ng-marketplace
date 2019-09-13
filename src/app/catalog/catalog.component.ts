import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FirestoreSearchQuery } from '../shared/services/firestoreSearchQuery.interface';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { CategoriesMenuComponent } from './categories-menu/categories-menu.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class CatalogComponent implements OnInit, OnDestroy {
  searchQuery;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {

    // this.subscription = this.route.paramMap.subscribe(params => {
    //   console.log(params.get('url'));
    //   this.ref.markForCheck();
    //
    //   this.searchQuery = {where: [{fieldPath: 'category', opStr: '==', value: params.get('url')}]};
    // });
  }

  ngOnInit() {
    // const ids = CategoriesMenuComponent.categories;
    // const queries = ids.map(el => col.doc(el).valueChanges());
    // this.searchQuery = this.route.paramMap.pipe(
    //   map((params: ParamMap) => {
    //     console.log('params', params.get('url'));
    //     return params.get('url');
    //   }
    // ));
    this.searchQuery = this.route.params.pipe(
      map(routeParams => {
        return routeParams.url;
      })
    );
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
