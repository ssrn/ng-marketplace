import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../products/firestore.service';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuComponent implements OnInit {
  menu: Observable<DocumentData[]>;

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    this.menu = this.db.getMainMenu();
  }

  identify(index: number, item): string {
    return item.name;
  }
}
