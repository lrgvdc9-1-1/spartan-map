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
  holdBasemapIndex: number = -1;
  listSel: boolean = true;
  baseSel: boolean = false;
  quickpick: boolean = true;
  city: boolean = false;
  msag: boolean = false;
  @Input() esriMap: EsriComponent = null;
  @Output() close = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
    this.quickpick = this.esriMap.getQuickPickVisible();
    this.style = {
      position: "absolute", zIndex: 2,
      top: "0", 
      left: "0",
      bottom: "30px",
      width: "40%", 
      height: "90%"
    } 
    let key_selected = this.esriMap.getMap().getBasemap();
    console.log("SELECTED BASE IS ", key_selected);  
    for(var key in esri['basemaps']) {
       
       let image = esri['basemaps'][key].thumbnailUrl;
       let title = esri['basemaps'][key].title;
       
       this.basemaps.push({"key" : key,
       "selection" : (key_selected == key ? true : false),
        "image" : image, "title" : title});

        if(key_selected == key) {
          this.holdBasemapIndex = this.basemaps.length - 1;
        }
        
    }
   
  }

  onClose() {
    this.close.emit(false);
  }

  onList() {
    this.baseSel = false;
    this.listSel = true;
    
  }

  onChangeQuickPick() {
    this.esriMap.setVisibleQuickPick(!this.quickpick);
  }
  onBase() {
    this.baseSel = true;
    this.listSel = false;
    
  }

  onChangeBase(key, index) {
  
    this.basemaps[this.holdBasemapIndex].selection = false;
    this.holdBasemapIndex = index;
    this.basemaps[index].selection = true;
    this.esriMap.changeBaseMap(key);
  }

  onChangeCity() {
    this.city = !this.city;
    this.msag = false;
    if(!this.city) {
      this.esriMap.hideCityLayer();
    }else{
      this.esriMap.showCityLayer();
    }
  }

  onChangeMSAG() {

    this.msag = !this.msag;
    this.city = false;
    if(!this.msag) {
      this.esriMap.hideCityLayer();
    }else {
      this.esriMap.showMSAGLayer();
    }
  }

}
