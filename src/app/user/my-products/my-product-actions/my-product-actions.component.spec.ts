import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductActionsComponent } from './my-product-actions.component';

describe('MyProductActionsComponent', () => {
  let component: MyProductActionsComponent;
  let fixture: ComponentFixture<MyProductActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProductActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProductActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
