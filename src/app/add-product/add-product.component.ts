import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Category } from '../catalog/categories-menu/category.interface';
import { Product } from '../products/product.interface';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Validators } from 'angular-reactive-validation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})

export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  filesToUpload: FileList;
  productPhotoPaths: string[] = [];
  productMainCategories: Category[];
  productSubcategories: Category[];
  submitted = false;

  constructor(
    private products: ProductsService,
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.products.getProductCategories().subscribe(
      categories => {
        this.productMainCategories = categories.filter(category => category.parentId === '');
        const subCategoriesArr = [];
        this.productMainCategories.map(mainCategory => {
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
      category: new FormControl({}, Validators.required('Категория обязательна')),
      name: new FormControl('', [
        Validators.required('Название обязательно'),
        Validators.minLength(4, minLength => `Минимальная длина ${minLength} знаков`),
        Validators.maxLength(40, maxLength => `Максимальная длина ${maxLength} знаков`)
      ]),
      price: new FormControl(0, [
        Validators.max(9999999, max => `Максимальная цена ${max}`),
      ]),
      photos: null,
      description: '',
      published: true,
      uid: this.auth.uid,
      date: Date.now(),
      promoted: false
    });
  }

  handleSubmit(product: Product) {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }

    const addProduct = this.products.addProduct(product)
      .then(result => result.id);
    let afterAddingProduct;
    if (product.photos) {
      afterAddingProduct = addProduct
        .then((productId) => { this.products.uploadProductPhotos(this.filesToUpload); return productId; })
        .then((productId) => this.products.updateProduct(productId, this.productPhotoPaths));
    } else {
      afterAddingProduct = addProduct
        .then((productId) => this.products.updateProduct(productId));
    }
    afterAddingProduct.then(() => this.toastr.success('Товар успешно добавлен', null, {
      timeOut: 3000
    }))
      .then(() => this.router.navigate(['/user/my-products']))
      .catch(error => this.toastr.error(error));
  }

  handlePhotosInput(files: FileList) {
    this.filesToUpload = files;
    Array.from(this.filesToUpload).forEach((file) =>
      this.productPhotoPaths.push(`products/${file.name}`)
    );
  }
}
