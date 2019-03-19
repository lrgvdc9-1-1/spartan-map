import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkTableComponent } from './bookmark-table.component';

describe('BookmarkTableComponent', () => {
  let component: BookmarkTableComponent;
  let fixture: ComponentFixture<BookmarkTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
