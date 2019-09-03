import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirestoreService} from '../services/firestore.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product;
  photoUrl: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private db: FirestoreService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.db.getProduct(params.get('id'))
        .subscribe(x => {
          this.product = x;
          this.photoUrl = this.db.downloadPhoto(this.product.img[0]);
        });
    });
  }

}
