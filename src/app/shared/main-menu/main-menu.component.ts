import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { MainMenuService } from './main-menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainMenuComponent {
  menu: Observable<DocumentData[]> = this.menuService.getMainMenu();

  constructor(private menuService: MainMenuService) { }

  identify(index: number, item): string {
    return item.name;
  }
}
