import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map-bookmark',
  templateUrl: './map-bookmark.component.html',
  styleUrls: ['./map-bookmark.component.css']
})
export class MapBookmarkComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.close.emit(false);
  }

}
