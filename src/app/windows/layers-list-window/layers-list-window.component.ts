import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { EsriComponent } from 'src/app/map/esri/esri.component';

//We might used don't know yet...
declare var esri;
@Component({
  selector: 'app-layers-list-window',
  templateUrl: './layers-list-window.component.html',
  styleUrls: ['./layers-list-window.component.css']
})
export class LayersListWindowComponent implements OnInit {
  public style: any = {};
  public basemaps: Array<any> = [];
  listSel: boolean = true;
  baseSel: boolean = false;

  @Input() esriMap: EsriComponent = null;
  @Output() close = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {

    this.style = {
      position: "absolute", zIndex: 2,
      top: "0", 
      left: "0",
      bottom: "30px",
      width: "40%", 
      height: "90%"
    }   
    for(var key in esri['basemaps']) {
       
       let image = esri['basemaps'][key].thumbnailUrl;
       let title = esri['basemaps'][key].title;
       this.basemaps.push({"key" : key,"selection" : false, "image" : image, "title" : title});
    }
   
  }

  onClose() {
    this.close.emit(false);
  }

  onList() {
    this.baseSel = false;
    this.listSel = true;
    
  }
  onBase() {
    this.baseSel = true;
    this.listSel = false;
    
  }

  onChangeBase(key) {
    console.log(key);
    this.esriMap.changeBaseMap(key);
  }

}
