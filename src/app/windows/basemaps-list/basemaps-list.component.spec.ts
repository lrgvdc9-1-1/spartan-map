import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasemapsListComponent } from './basemaps-list.component';

describe('BasemapsListComponent', () => {
  let component: BasemapsListComponent;
  let fixture: ComponentFixture<BasemapsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasemapsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasemapsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
