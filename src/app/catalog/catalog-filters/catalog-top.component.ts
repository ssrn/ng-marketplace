import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-catalog-top',
  templateUrl: './catalog-top.component.html',
  styleUrls: ['./catalog-top.component.scss']
})
export class CatalogTopComponent {
  @Output() sortByPopularity: EventEmitter<any> = new EventEmitter();
  @Output() sortFromLowToHigh: EventEmitter<any> = new EventEmitter();
  @Output() sortFromHighToLow: EventEmitter<any> = new EventEmitter();
  @Output() sortPhotos: EventEmitter<any> = new EventEmitter();
  @Input() isPhotosChecked: boolean;

  handleSort(value) {
    switch (value) {
      case 'low':
        this.handleSortFromLowToHigh();
        break;
      case 'high':
        this.handleSortFromHighToLow();
        break;
      default:
        this.handleSortByPopularity();
        break;
    }
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
