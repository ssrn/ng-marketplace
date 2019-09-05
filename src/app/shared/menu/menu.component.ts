import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  productCategories: Observable<DocumentData[]>;

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    this.productCategories = this.db.getCategories();
  }
}
