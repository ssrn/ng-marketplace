import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoriesMenuService } from './categories-menu.service';
import { Category } from './category.interface';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss']
})
export class CategoriesMenuComponent implements OnInit {
  categories: Category[];
  url: string;

  constructor(
    private menuService: CategoriesMenuService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.url = routeParams.url;
      this.menuService.getSubcategoriesMenu(routeParams.url)
        .subscribe(data => {
          this.categories = data;
        });
    });
  }

  identify(index: number, item): string {
    return item.name;
  }
}
