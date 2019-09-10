import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FirestoreSearchQuery } from '../services/firestoreSearchQuery.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class CatalogComponent implements OnInit, OnDestroy {
  searchQuery: FirestoreSearchQuery ;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.subscription = this.route.paramMap.subscribe(params => {
      console.log(params.get('url'));
      this.searchQuery = {where: [{fieldPath: 'category', opStr: '==', value: params.get('url')}]};
    });
  }

  ngOnInit() {
    // this.subscription = this.route.paramMap.subscribe(params => {
    //   console.log(params.get('url'));
    //   this.searchQuery = {where: [{fieldPath: 'category', opStr: '==', value: params.get('url')}]};
    // });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
