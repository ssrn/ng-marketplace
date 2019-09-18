import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../shared/services/firestore.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { Product } from '../app.interfaces';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery';
import { AngularFireStorage } from '@angular/fire/storage';
import { flatMap, map, mergeMap, switchMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductPageComponent implements OnInit, OnDestroy {
  product: Observable<Product>;
  subscription: Subscription;
  galleryImages: Array<{} | null> = [];
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '400px',
      lazyLoading: false,
      imagePercent: 100,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20,
      thumbnailsAutoHide: true
    },
    // max-width 400
    {
      breakpoint: 400,
      preview: false
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private db: FirestoreService,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.pipe(
      map(param => this.db.getProduct(param.id))
    ).subscribe(data => {
      this.product = data;
      this.product.subscribe(product => {
        if (product.img !== null) {
          this.createGalleryImages(product.img);
        }
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createGalleryImages(paths: string[]): Subscription {
    const observable = this.db.getProductPhotos(paths);
    return observable.subscribe(urls => {
      this.galleryImages.splice(0, this.galleryImages.length);
      urls.forEach((url) => {
        this.galleryImages.push({
          small: url,
          medium: url,
          big: url
        });
      });
    });
  }
}
