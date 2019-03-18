import { Component, OnInit, Input } from '@angular/core';
import { InboxComponent } from '../inbox/inbox.component';
import { EsriComponent } from 'src/app/map/esri/esri.component';

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css']
})
export class MapToolbarComponent implements OnInit {
  public style: any = {};
  mini: boolean = true;
  @Input() inbox: InboxComponent;
  @Input() esriMap: EsriComponent;

  constructor() { }

  ngOnInit() {

    
      this.style = {
        position: "absolute", zIndex: 2,
        bottom: "30px", 
        left: "80px",
        width: "60px", 
        height: "40px",
        backgroundColor: "#201325"
      }    
  }

  onHomeExtent() {
    this.esriMap.map.setExtent(this.esriMap.homeExtent);
  }

  onMiniBar() {
      if(this.mini) {
        console.log(this.style);
        this.style['width'] =   "240px";
      }else {
        this.style['width'] =  "60px";
      }

      this.mini = !this.mini;
  }

}
