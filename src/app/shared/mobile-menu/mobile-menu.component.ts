import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { MainMenuService } from '../main-menu/main-menu.service';
import { AuthService } from '../../auth/auth.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})

export class MobileMenuComponent implements OnInit {
  isMenuOpen = false;
  menu: Observable<DocumentData[]> = this.menuService.getMainMenu();

  constructor(
    private menuService: MainMenuService,
    public auth: AuthService,
    public sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.isOpen.subscribe(state => {
      this.isMenuOpen = state;
    });
  }

  identify(index: number, item): string {
    return item.name;
  }
}
