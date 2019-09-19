import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistBtnComponent } from './wishlist-btn.component';

describe('WishlistBtnComponent', () => {
  let component: WishlistBtnComponent;
  let fixture: ComponentFixture<WishlistBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
