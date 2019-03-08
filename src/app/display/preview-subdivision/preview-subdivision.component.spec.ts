import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSubdivisionComponent } from './preview-subdivision.component';

describe('PreviewSubdivisionComponent', () => {
  let component: PreviewSubdivisionComponent;
  let fixture: ComponentFixture<PreviewSubdivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewSubdivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewSubdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
