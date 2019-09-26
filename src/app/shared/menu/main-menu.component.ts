import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { MainMenuService } from './main-menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainMenuComponent implements OnInit {
  menu: Observable<DocumentData[]>;

  constructor(private menuService: MainMenuService) { }

  ngOnInit() {
    this.menu = this.menuService.getMainMenu();
  }

  identify(index: number, item): string {
    return item.name;
  }
}
