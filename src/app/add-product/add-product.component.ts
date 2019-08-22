import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firebase.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public addProductForm: FormGroup;

  constructor(
    public firestoreService: FirestoreService,
    public fb: FormBuilder
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
    this.firestoreService.addProduct(product)
      .then(result => {
        alert('Успешно');
      })
      .catch((error) => {
        alert('Ошибка');
      });
  }
}

