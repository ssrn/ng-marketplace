import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  private addProductForm: FormGroup;
  fileToUpload: File = null;
  productId = '';

  constructor(
    private db: FirestoreService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initProductForm();
  }

  initProductForm() {
    this.addProductForm = this.fb.group({
      category: '',
      img: null,
      name: ['', [
          Validators.required,
          // Validators.pattern(/[А-я]/)
        ]
      ],
      price: [null, [Validators.required]],
      description: '',
      metro: ''
    });
  }

  onSubmitProductData(product) {
    this.db.addProduct(product)
      .then(result => this.productId = result.id)
      .then(result => this.db.uploadPhotos(this.fileToUpload))
      .then(result => this.db.updateProduct(this.productId, `products/${this.fileToUpload.name}`))
      .catch(error => alert('Ошибка'));
  }

  handlePhotosInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log('this.fileToUpload', this.fileToUpload.name);
  }
}

