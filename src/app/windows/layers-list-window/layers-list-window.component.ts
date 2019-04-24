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

    //get City Layer..
    let cityB = this.esriMap.getCityLayer();
    console.log(cityB);
    this.style = {
      position: "absolute", zIndex: 2,
      top: "0", 
      left: "0",
      bottom: "30px",
      width: "40%", 
      height: "90%"
    } 

    //If city layer is not turn off the check boxes..
    if(!cityB.visible) {
        this.city = false;
        this.msag = false;
    }else { // if the layer is visible we need to find out which check box is click from the layer
      let lng = cityB.visibleLayers.length;
      if(lng == 1) { //VisisbleLayers is an array type of numbers...
        let option = cityB.visibleLayers[0]; //Lets get the first option we are assuming only one number should be involve..
        
        switch (option) { //This switch statement handles which layer to display...
          case 0: //If option 0 is city
            this.city = true;
            break;
          case 1: //If option 1 is msag.///
            this.msag = true;
            break;
          default:
            break;
        }
      }
    }

    //Handle the basemaps below...

    let key_selected = this.esriMap.getMap().getBasemap();
    
    //Find out which basemap is selected...
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
