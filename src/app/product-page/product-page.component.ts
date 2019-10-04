import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { Observable, of, Subscription } from 'rxjs';
import { NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { switchMap } from 'rxjs/operators';
import { WishlistService } from '../products/wishlist-btn/wishlist.service';
import { Product } from '../products/product.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})

export class ProductPageComponent implements OnInit, OnDestroy {
  product$: Observable<Product> = this.route.params.pipe(
    switchMap((param) => this.productsService.getProduct(param.id))
  );
  photoUrl$: Observable<string[]> = this.product$.pipe(
    switchMap((product) => this.productsService.getProductPhotos(product.photos))
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
    private productsService: ProductsService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit() {
    // NgxGalleryImage does not accept Observable
    this.subscription = this.photoUrl$.subscribe(urls => {
      if (urls) {
        this.galleryImages = urls.map((url) => {
          return {
            small: url,
            medium: url,
            big: url
          };
        });
      } else {
        this.galleryImages = [{
          small: '../../assets/images/svg/no-product-photo.svg',
          medium: '../../assets/images/svg/no-product-photo.svg',
          big: '../../assets/images/svg/no-product-photo.svg'
        }];
      }
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
