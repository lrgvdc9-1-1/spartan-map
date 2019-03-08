import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInboxComponent } from './list-inbox.component';

describe('ListInboxComponent', () => {
  let component: ListInboxComponent;
  let fixture: ComponentFixture<ListInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
