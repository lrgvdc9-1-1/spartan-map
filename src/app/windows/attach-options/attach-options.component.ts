import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';
import { EsriComponent } from 'src/app/map/esri/esri.component';

@Component({
  selector: 'app-attach-options-window',
  templateUrl: './attach-options.component.html',
  styleUrls: ['./attach-options.component.css']
})
export class AttachOptionsComponent implements OnInit {
  public style: any = {};
  visible: boolean = true;
  @Input() esriMap:  EsriComponent;
  @Output() close = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {

    this.style = {
      position: "absolute", zIndex: 2,
      top: "50%", 
      left: "50%",
      bottom: "30px",
      width: "400px", 
      height: "330px",
      marginLeft: "-200px",
      marginTop: "-150px"
    }    

    //ON EVENT LISTENER
    this.esriMap.onAttachEvent.subscribe((response) => {
        console.log(response);
        this.esriMap.setMapCursor("default");
        this.esriMap.enableAttach = false;
    });
  }

  getHeight() {
    this.visible = !this.visible;
    if(this.visible) {
      this.style.height = "330px";
    } else {
      this.style.height = "30px";
    }
  }


  onClose() {
    this.esriMap.setMapCursor("default");
    this.close.emit(false);
  }

  drawMap(option:number) {

    //Always enable the map cursor...
    //as well enable the attachment mode in map component..

    this.esriMap.setMapCursor("crosshair");
    this.esriMap.enAttach();
    this.esriMap.setDrawingOption(option); 
   
  }
}
