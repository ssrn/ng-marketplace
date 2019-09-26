import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../products/firestore.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../app.interfaces';
import { NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { switchMap } from 'rxjs/operators';
import { WishlistService } from '../products/wishlist-btn/wishlist.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})

export class ProductPageComponent implements OnInit, OnDestroy {
  product$: Observable<Product> = this.route.params.pipe(
    switchMap((param) => this.db.getProduct(param.id))
  );
  photoUrl: Observable<string[]> = this.product$.pipe(
    switchMap((product) => this.db.getProductPhotos(product.img))
  );
  @Output() remove: EventEmitter<string> = new EventEmitter();
  subscription: Subscription;
  galleryImages: NgxGalleryImage[] = [];
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '100%',
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
    private wishlistService: WishlistService
  ) { }

  ngOnInit() {
    // NgxGalleryImage does not accept Observable
    this.subscription = this.photoUrl.subscribe(urls => {
      this.galleryImages = urls.map((url) => {
        return {
          small: url,
          medium: url,
          big: url
        };
      });
    });
  }

  checkProductInWishlist(id: string) {
    return this.wishlistService.checkProduct(id);
  }

  handleAddToWishlist($event, id: string) {
    return this.wishlistService.addProduct(id);
  }

  handleRemoveFromWishlist($event, id: string) {
    this.wishlistService.removeProduct(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
