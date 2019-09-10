import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../app.interfaces';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddProductComponent implements OnInit {
  private addProductForm: FormGroup;
  filesToUpload: FileList;
  productPhotoPaths: string[] = [];
  productId: string;

  constructor(
    private db: FirestoreService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initProductForm();
  }

  initProductForm() {
    this.addProductForm = this.fb.group({
      id: '',
      category: '',
      img: '',
      name: ['', [
          Validators.required,
          // Validators.pattern(/[А-я]/)
        ]
      ],
      price: [0, [Validators.required]],
      description: '',
      metro: ''
    });
  }

  onSubmitProductData(product: Product) {
    this.db.addProduct(product)
      .then(result => this.productId = result.id)
      .then(() => this.db.uploadPhotos(this.filesToUpload))
      .then(() => this.db.updateProduct(this.productId, this.productPhotoPaths))
      .then(() => alert('success'))
      .catch(error => console.log(error));
  }

  handlePhotosInput(files: FileList) {
    this.filesToUpload = files;
    Array.from(this.filesToUpload).forEach(file => {
      this.productPhotoPaths.push(`products/${file.name}`);
    });
  }
}
