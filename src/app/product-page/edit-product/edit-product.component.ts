import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../products/firestore.service';
import { Category } from '../../catalog/categories-menu/category.interface';
import { Product } from '../../products/product.interface';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: Observable<Product> = this.route.params.pipe(
    switchMap((param) => this.db.getProduct(param.id))
  );
  productForm: FormGroup;
  productMainCategories: Category[];
  productSubcategories: Category[];

  constructor(
    private route: ActivatedRoute,
    private db: FirestoreService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // Observable Observable
    // this.product = this.db.getProduct('p1xQNB7nVhBLqzw55ypT');

    this.db.getProductCategories().subscribe(
      categories => {
        this.productMainCategories = categories.filter(category => category.parentId === '');
        const subCategoriesArr = [];
        this.productMainCategories.forEach(mainCategory => {
          const subCategory = categories.filter(category => category.parentId === mainCategory.id);
          subCategoriesArr.push(subCategory);
        });
        this.productSubcategories = subCategoriesArr;
      }
    );
    this.initProductForm();
  }

  initProductForm() {
    this.productForm = this.fb.group({
      id: '',
      category: {},
      img: this.fb.array([]),
      name: ['', [
        Validators.required,
        // Validators.pattern(/[А-я]/)
      ]
      ],
      price: [0, Validators.required],
      description: '',
      published: true
    });
  }

  handleSubmit(product: Product) {}
}
