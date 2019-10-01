import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as algoliasearch from 'algoliasearch';
import { environment } from '../../../environments/environment';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.apiKey
);

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  config = {
    indexName: 'products',
    searchClient
  };

  constructor(private db: AngularFirestore) {}

  ngOnInit() {

  }

  handle(): void {

    const index = searchClient.initIndex('products');

    console.log('index', index);

    this.db.collection('products').valueChanges()
      .subscribe(objects => {
        console.log('objects', objects);
        index.addObjects(objects, (err, content) => {
          console.log('content', content);
        });
      });
  }

  // searchChanged(query) {
  //   this.showResults = !!query.length;
  // }

  // searchForm: FormGroup;
  // searchValue = '';
  // results: any;
  //
  // constructor(
  //   private db: SearchService,
  //   private fb: FormBuilder,
  //   private router: Router
  // ) { }
  //
  // ngOnInit() {
  //   this.initSearchForm();
  // }
  //
  // initSearchForm() {
  //   this.searchForm = this.fb.group({
  //     input: '',
  //   });
  // }
  //
  // handleLiveSearch(value) {
  //   console.log('value', value);
  //   this.results = this.db.searchProducts(value);
  //   return this.results;
  // }
  //
  // handleSubmit() {
  //   this.router.navigate(['/catalog/fruits']);
  // }
}
