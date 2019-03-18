import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBookmarkComponent } from './map-bookmark.component';

describe('MapBookmarkComponent', () => {
  let component: MapBookmarkComponent;
  let fixture: ComponentFixture<MapBookmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapBookmarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
