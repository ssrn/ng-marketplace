import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FirestoreSearchQuery } from '../shared/services/firestoreSearchQuery.interface';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
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
  url: string[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {

    // this.subscription = this.route.params.subscribe(params => {
    //   // console.log(params.get('url'));
    //   // this.ref.markForCheck();
    //   this.searchQuery = params;
    // });

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.url = this.router.url.split('/');
        // console.log('url', this.url);

        if (this.url.length < 4) {
          this.searchQuery = {where: [{fieldPath: 'category.parentId', opStr: '==', value: this.url[this.url.length - 1]}]};
          // console.log('searchQuery', this.searchQuery);
        } else {
          this.searchQuery = {where: [{fieldPath: 'category.id', opStr: '==', value: this.url[this.url.length - 1]}]};
          // console.log('searchQuery', this.searchQuery);
        }
      }
    });
  }

  ngOnInit() {
    // console.log('url', this.router.url);
    // const ids = CategoriesMenuComponent.categories;
    // const queries = ids.map(el => col.doc(el).valueChanges());
    // this.searchQuery = this.route.paramMap.pipe(
    //   map((params: ParamMap) => {
    //     console.log('params', params.get('url'));
    //     return params.get('url');
    //   }
    // ));
    // this.searchQuery = this.route.params.pipe(
    //   map(routeParams => {
    //     return routeParams.url;
    //   })
    // );

  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
