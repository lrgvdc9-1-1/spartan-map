import { Component, OnInit, Input } from '@angular/core';
import { BOOKMARK } from 'src/app/model/interface';
import { EsriComponent } from 'src/app/map/esri/esri.component';
import { EsriService } from 'src/app/map/esri.service';

@Component({
  selector: 'app-bookmark-table',
  templateUrl: './bookmark-table.component.html',
  styleUrls: ['./bookmark-table.component.css']
})
export class BookmarkTableComponent implements OnInit {
  @Input() bookmarks: Array<BOOKMARK> = [];
  @Input() esriMap: EsriComponent = null;
  constructor(public esri: EsriService) { }

  ngOnInit() {
  }

  onZoom(mark: BOOKMARK) {
    
    if(typeof(mark.bookmark_json) == "string") { //If string convert to extent object so esri map can consume...
      mark.bookmark_json = new this.esri.esriExtent(JSON.parse(mark.bookmark_json));
      
    }
    if(this.esriMap) {
      //Zoom TO Extent
      this.esriMap.zoomToExtent(mark.bookmark_json);
    }
    
  }

}
