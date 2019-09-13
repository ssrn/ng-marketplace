import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FirestoreService } from '../../shared/services/firestore.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss']
})
export class CategoriesMenuComponent implements OnInit {
  categories;
  url: string;
  ngForTrackBy: TrackByFunction<any>;

  constructor(
    private db: FirestoreService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.url = routeParams.url;
      this.db.getMenuCategories(routeParams.url)
        .subscribe(data => {
          this.categories = data;
        });
    });
  }
}
