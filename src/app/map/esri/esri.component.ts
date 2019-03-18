import { Component, OnInit } from '@angular/core';
import { EsriService } from '../esri.service';

declare var esri;

@Component({
  selector: 'map-esri',
  templateUrl: './esri.component.html',
  styleUrls: ['./esri.component.css']
})
export class EsriComponent implements OnInit {

  map: any = null;
  vector: any  =null;
  selectionSymbol: any = null;
  public homeExtent: any = null;
  constructor(public service: EsriService) { }

  ngOnInit() {


   var timeout = setInterval(() => {
      if(this.service.loaded) {
         this.loadMap();
        
          var purple = this.service.esriColor.fromHex("#9E2CCF");
          this.selectionSymbol = new this.service.esriSimpleMarkerSymbol(this.service.esriSimpleMarkerSymbol.STYLE_SQUARE, 10,
            new this.service.esriSimpleLineSymbol(this.service.esriSimpleLineSymbol.STYLE_SOLID,
            purple, 1),
            purple)
            clearInterval(timeout); //Stop the looping..
          }
    }, 40);
      
   
  }

  loadMap() {
    this.map = new this.service.map("esri-map", {slider: false, logo: false});
    this.vector  = new this.service.vector(this.service.vectorSubURL);
    this.map.addLayer(this.vector);

    this.map.on("load", () => {
        this.homeExtent = this.map.extent;

        console.log(this.homeExtent);
    });
  }


  //Zoom to Particular Extent if pnt provided will display selection graphic...
  zoomToExtent(extent, pnt:any = null) {

    this.map.setExtent(extent);
    if(pnt) {
        this.map.graphics.clear();
        this.map.graphics.add(new this.service.esriGraphic(pnt, this.selectionSymbol));
    }
  }

  clearMainGraphics() {
    this.map.graphics.clear();
  }

}
