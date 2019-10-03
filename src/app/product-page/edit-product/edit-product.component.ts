import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products/products.service';
import { Category } from '../../catalog/categories-menu/category.interface';
import { Product } from '../../products/product.interface';
import { Validators } from 'angular-reactive-validation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product$: Observable<Product> = this.route.params.pipe(
    switchMap((param) => this.productsService.getProduct(param.id))
  );
  productForm: FormGroup;
  productMainCategories: Category[];
  productSubcategories: Category[];
  photoUrl$: Observable<string[]>;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productsService.getProductCategories().subscribe(
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
    this.product$.subscribe((product) => {
      if (product.photos) {
        this.photoUrl$ = this.productsService.getProductPhotos(product.photos);
      }
      this.initProductForm(product);
    });
  }

  initProductForm(product) {
    this.productForm = this.fb.group({
      id: new FormControl(product.id),
      category: new FormControl(product.category),
      name: new FormControl(product.name, [
        Validators.required('Название обязательно')
      ]),
      price: new FormControl(product.price, [
        Validators.max(9999999, max => `Максимальная цена ${max}`),
      ]),
      photos: new FormControl(product.photos),
      description: new FormControl(product.description),
      published: new FormControl(product.published),
      uid: new FormControl(product.uid),
      date: Date.now(),
      promoted: new FormControl(product.promoted),
    });
  }

  handleSubmit(product: Product) {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }

    this.productsService.updateEditedProduct(product.id, product)
      .then(() => this.toastr.success('Данные успешно обновлены', null, {
        timeOut: 3000
      }))
      .then(() => this.router.navigate(['/user/my-products']))
      .catch(error => this.toastr.error(error));
  }
}
