import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-catalog-top',
  templateUrl: './catalog-top.component.html',
  styleUrls: ['./catalog-top.component.scss']
})
export class CatalogTopComponent implements OnInit {
  @Output() sortByPopularity: EventEmitter<any> = new EventEmitter();
  @Output() sortFromLowToHigh: EventEmitter<any> = new EventEmitter();
  @Output() sortFromHighToLow: EventEmitter<any> = new EventEmitter();
  @Output() sortPhotos: EventEmitter<any> = new EventEmitter();
  @Input() isPhotosChecked: boolean;

  constructor() { }

  ngOnInit() {
  }

  handleSortByPopularity(): void {
    this.sortByPopularity.emit(null);
  }

  handleSortFromLowToHigh(): void {
    this.sortFromLowToHigh.emit(null);
  }

  handleSortFromHighToLow(): void {
    this.sortFromHighToLow.emit(null);
  }

  handleSortPhotos(): void {
    this.sortPhotos.emit(this);
  }
}
