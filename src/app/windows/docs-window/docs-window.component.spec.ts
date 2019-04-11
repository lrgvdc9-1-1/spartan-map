import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsWindowComponent } from './docs-window.component';

describe('DocsWindowComponent', () => {
  let component: DocsWindowComponent;
  let fixture: ComponentFixture<DocsWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
