import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FirestoreService } from '../shared/services/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, Product } from '../app.interfaces';

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
    private db: FirestoreService,
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
      img: null,
      name: ['', [
          Validators.required,
          // Validators.pattern(/[А-я]/)
        ]
      ],
      price: [0, Validators.required],
      description: '',
      metro: ''
    });
  }

  onSubmitProductData(product: Product) {
    if (product.img !== null) {
      this.db.addProduct(product)
        .then(result => this.productId = result.id)
        .then(() => this.db.uploadProductPhotos(this.filesToUpload))
        .then(() => this.db.updateProduct(this.productId, this.productPhotoPaths))
        .then(() => alert('success'))
        .catch(error => console.log(error));
    } else {
      this.db.addProduct(product)
        .then(result => this.productId = result.id)
        .then(() => this.db.updateProduct(this.productId))
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
