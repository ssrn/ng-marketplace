import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuComponent implements OnInit {
  productCategories: Observable<DocumentData[]>;
  ngForTrackBy: TrackByFunction<any>;

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    this.productCategories = this.db.getCategories();
  }
}
