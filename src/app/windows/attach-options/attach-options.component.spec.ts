import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachOptionsComponent } from './attach-options.component';

describe('AttachOptionsComponent', () => {
  let component: AttachOptionsComponent;
  let fixture: ComponentFixture<AttachOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
