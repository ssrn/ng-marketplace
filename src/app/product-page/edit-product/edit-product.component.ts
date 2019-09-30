import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../products/products.service';
import { Category } from '../../catalog/categories-menu/category.interface';
import { Product } from '../../products/product.interface';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product$: Observable<Product> = this.route.params.pipe(
    switchMap((param) => this.db.getProduct(param.id))
  );
  productForm: FormGroup;
  filesToUpload: FileList;
  productPhotoPaths: string[] = [];
  productMainCategories: Category[];
  productSubcategories: Category[];

  constructor(
    private route: ActivatedRoute,
    private db: ProductsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
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
      photos: this.fb.array([]),
      name: ['', [
        Validators.required,
        // Validators.pattern(/[А-я]/)
      ]
      ],
      price: [0, Validators.required],
      description: '',
      published: true
    });

    // this.product$.subscribe(
    //   data => {
    //     this.productForm.controls['category'].setValue(data.id);
    //   }
    // );
  }

  handleSubmit(product: Product) {

  }
}
