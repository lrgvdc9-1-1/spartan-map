import { Component, OnInit, Input } from '@angular/core';
import { BOOKMARK } from 'src/app/model/interface';
import { EsriComponent } from 'src/app/map/esri/esri.component';

@Component({
  selector: 'app-bookmark-table',
  templateUrl: './bookmark-table.component.html',
  styleUrls: ['./bookmark-table.component.css']
})
export class BookmarkTableComponent implements OnInit {
  @Input() bookmarks: Array<BOOKMARK> = [];
  @Input() esriMap: EsriComponent = null;
  constructor() { }

  ngOnInit() {
  }

  onZoom(mark: BOOKMARK) {
    
    if(typeof(mark.bookmark_json) == "string") {
      console.log(mark.bookmark_json)
      console.log("STRING");
      console.log(typeof(mark.bookmark_json));
      mark.bookmark_json= JSON.parse(mark.bookmark_json);
      console.log(mark);
    }
    if(this.esriMap) {
      //Zoom TO Extent
      this.esriMap.zoomToExtent(mark.bookmark_json);
    }
    
  }

}
