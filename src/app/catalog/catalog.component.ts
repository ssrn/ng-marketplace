import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/product.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})

export class CatalogComponent {
  products$: Observable<Product[]>;
  url: string[];
  isMainCategory: boolean;
  category: string;
  isPhotosChecked = false;
  isPriceSorted: false | 'asc' | 'desc';

  constructor(
    private router: Router,
    private productsService: ProductsService,
  ) {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.url = this.router.url.split('/');
      this.isMainCategory = this.url.length < 4;
      this.category = this.url[this.url.length - 1];
      this.handleSortingAndFiltering();
    });

    // For Algolia search
    // this.productsService.getProducts().subscribe(x => console.log('x', JSON.stringify(x)));
  }

  handleSortByPopularity() {
    this.handleSortingAndFiltering();
  }

  handleSortFromLowToHigh() {
    this.isPriceSorted = 'asc';
    this.handleSortingAndFiltering();
  }

  handleSortFromHighToLow() {
    this.isPriceSorted = 'desc';
    this.handleSortingAndFiltering();
  }

  handleSortPhotos($event) {
    this.isPhotosChecked = !this.isPhotosChecked;
    this.handleSortingAndFiltering();
  }

  handleSortingAndFiltering() {
    this.products$ = this.productsService.getPublishedProductsByCategory(
      this.isMainCategory,
      this.category,
      this.isPhotosChecked,
      this.isPriceSorted
    );
  }
}
