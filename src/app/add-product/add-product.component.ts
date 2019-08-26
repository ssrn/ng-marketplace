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

  constructor(
    private afs: FirestoreService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initProductForm();
  }

  initProductForm() {
    this.addProductForm = this.fb.group({
      category: '',
      name: ['', [
          Validators.required,
          // Validators.pattern(/[А-я]/)
        ]
      ],
      price: [null, [Validators.required]],
      photos: '',
      description: '',
      metro: ''
    });
  }

  onSubmitProductData(product) {
    this.afs.addProduct(product)
      .then(result => {
        alert('Успешно');
      })
      .catch((error) => {
        alert('Ошибка');
      });
  }
}

