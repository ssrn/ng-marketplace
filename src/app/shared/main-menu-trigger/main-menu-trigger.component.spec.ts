import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuTriggerComponent } from './main-menu-trigger.component';

describe('MainMenuTriggerComponent', () => {
  let component: MainMenuTriggerComponent;
  let fixture: ComponentFixture<MainMenuTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMenuTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
