import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersListWindowComponent } from './layers-list-window.component';

describe('LayersListWindowComponent', () => {
  let component: LayersListWindowComponent;
  let fixture: ComponentFixture<LayersListWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayersListWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersListWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
