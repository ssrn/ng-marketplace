import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FirestoreSearchQuery } from '../services/firestoreSearchQuery.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CatalogComponent {
  searchQuery: FirestoreSearchQuery = {where: [{fieldPath: 'category', opStr: '==', value: 'Овощи'}]};
}
