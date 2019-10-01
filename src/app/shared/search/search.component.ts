import { Component } from '@angular/core';
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

export class SearchComponent {
  config = {
    indexName: 'products',
    searchClient,
  };
}
