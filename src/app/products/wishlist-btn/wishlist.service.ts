import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishProductIds: Array<string> = WishlistService.loadProductIds();

  private static loadProductIds(): Array<string> {
    const str = localStorage.getItem('wishProducts');
    if (str === null) {
      return [];
    }
    return Object.values(JSON.parse(str));
  }

  private saveProductIds(): void {
    localStorage.setItem('wishProducts', JSON.stringify(this.wishProductIds));
  }

  addProduct(id: string): void {
    this.wishProductIds.push(id);
    this.saveProductIds();
  }

  removeProduct(id: string): void {
    const index = this.wishProductIds.indexOf(id);
    this.wishProductIds.splice(index, 1);
    this.saveProductIds();
  }

  checkProduct(id: string): boolean {
    if (this.wishProductIds === []) {
      return false;
    } else {
      return this.wishProductIds.includes(id);
    }
  }

  getProductIds(): Array<string> {
    return this.wishProductIds;
  }
}

