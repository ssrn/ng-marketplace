import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../products/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../app.interfaces';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss']
})
export class CategoriesMenuComponent implements OnInit {
  categories: Category[];
  url: string;

  constructor(
    private db: FirestoreService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.url = routeParams.url;
      this.db.getSubcategoriesMenu(routeParams.url)
        .subscribe(data => {
          this.categories = data;
        });
    });
  }

  identify(index: number, item): string {
    return item.name;
  }
}
