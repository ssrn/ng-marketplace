import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FirestoreSearchQuery } from '../services/firestoreSearchQuery.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainPageComponent {
  searchQuery: FirestoreSearchQuery = {limit: 4};
}
