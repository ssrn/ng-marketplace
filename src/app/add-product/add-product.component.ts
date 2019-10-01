import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../catalog/categories-menu/category.interface';
import { Product } from '../products/product.interface';
import { AuthService } from '../auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
      category: new FormControl({}, [
        Validators.required,
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40),
        Validators.pattern(/[А-я]/)
      ]),
      price: new FormControl(0, [
        Validators.required,
        Validators.maxLength(7),
      ]),
      photos: null,
      description: '',
      published: true,
      uid: this.auth.uid
    });
  }

  handleSubmit(product: Product) {
    if (product.photos) {
      this.products.addProduct(product)
        .then(result => this.productId = result.id)
        .then(() => this.products.uploadProductPhotos(this.filesToUpload))
        .then(() => this.products.updateProduct(this.productId, this.productPhotoPaths))
        .then(() => alert('success'))
        .then(() => this.toastr.success('Товар успешно добавлен!', null,{
          timeOut: 3000
        }))
        .catch(error => this.toastr.error(error));
    } else {
      this.products.addProduct(product)
        .then(result => this.productId = result.id)
        .then(() => this.products.updateProduct(this.productId))
        .then(() => this.toastr.success('Товар успешно добавлен!', null, {
          timeOut: 3000
        }))
        .catch(error => this.toastr.error(error));
    }
  }

  handlePhotosInput(files: FileList) {
    this.filesToUpload = files;
    Array.from(this.filesToUpload).forEach(file => {
      this.productPhotoPaths.push(`products/${file.name}`);
    });
  }
}
