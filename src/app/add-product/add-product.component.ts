import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../catalog/categories-menu/category.interface';
import { Product } from '../products/product.interface';
import { AuthService } from '../auth/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})

export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  filesToUpload: FileList;
  productPhotoPaths: string[] = [];
  productId: string;
  productMainCategories: Category[];
  productSubcategories: Category[];

  constructor(
    private products: ProductsService,
    private fb: FormBuilder,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.products.getProductCategories().subscribe(
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
      category: [{}, Validators.required],
      photos: null,
      name: ['', [
          Validators.required,
          // Validators.pattern(/[А-я]/)
        ]
      ],
      price: [0, Validators.required],
      description: '',
      published: true,
      uid: this.auth.uid$
    });
  }

  handleSubmit(product: Product) {
    if (product.photos) {
      this.products.addProduct(product)
        .then(result => this.productId = result.id)
        .then(() => this.products.uploadProductPhotos(this.filesToUpload))
        .then(() => this.products.updateProduct(this.productId, this.productPhotoPaths))
        .then(() => alert('success'))
        .catch(error => console.log(error));
    } else {
      this.products.addProduct(product)
        .then(result => this.productId = result.id)
        .then(() => this.products.updateProduct(this.productId))
        .then(() => alert('success'))
        .catch(error => console.log(error));
    }
  }

  handlePhotosInput(files: FileList) {
    this.filesToUpload = files;
    Array.from(this.filesToUpload).forEach(file => {
      this.productPhotoPaths.push(`products/${file.name}`);
    });
  }
}
