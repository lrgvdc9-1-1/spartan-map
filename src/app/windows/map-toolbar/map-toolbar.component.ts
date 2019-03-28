import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { InboxComponent } from '../inbox/inbox.component';
import { EsriComponent } from 'src/app/map/esri/esri.component';


@Component({
  selector: 'app-map-toolbar-window',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css']
})
export class MapToolbarComponent implements OnInit {
  public style: any = {};
  mini: boolean = true;
  @Input() inbox: InboxComponent;
  @Input() esriMap: EsriComponent;
  @Output() openBookmark = new EventEmitter<any>();
  @Output() openAttach = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {

    
      this.style = {
        position: "absolute", zIndex: 2,
        bottom: "30px", 
        left: "80px",
        width: "90px", 
        height: "40px",
        backgroundColor: "#201325"
      }    
  }

  onHomeExtent() {
    this.esriMap.map.setExtent(this.esriMap.homeExtent);
  }

  onMiniBar() {
      if(this.mini) {
        
        this.style['width'] =   "350px";
      }else {
        this.style['width'] =  "90px";
      }

      this.mini = !this.mini;
  }

  onOpenBookMark() {
    this.openBookmark.emit(true);
  }

  onOpenAttach() {
    this.openAttach.emit(true);
  }
  onIdentify() {
    console.log("I RAN");
    this.esriMap.setMapCursor("url(assets/information.cur),auto");
    //url(cursor1.png)
  }
}
