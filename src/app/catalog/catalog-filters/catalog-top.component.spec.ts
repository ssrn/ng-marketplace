import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogTopComponent } from './catalog-top.component';

describe('CatalogFiltersComponent', () => {
  let component: CatalogTopComponent;
  let fixture: ComponentFixture<CatalogTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
