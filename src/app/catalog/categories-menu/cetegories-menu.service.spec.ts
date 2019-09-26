import { TestBed } from '@angular/core/testing';

import { CategoriesMenuService } from './categories-menu.service';

describe('CetegoriesMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesMenuService = TestBed.get(CategoriesMenuService);
    expect(service).toBeTruthy();
  });
});
