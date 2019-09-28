import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  // tslint:disable-next-line:variable-name
  private readonly _isOpen: BehaviorSubject<boolean>;

  constructor() {
    this._isOpen = new BehaviorSubject(false);
  }

  public get isOpen() {
    return this._isOpen;
  }

  toggle() {
    this._isOpen.next(!this._isOpen.value);
  }
}
