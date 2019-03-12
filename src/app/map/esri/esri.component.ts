import { Component, OnInit } from '@angular/core';
import { EsriService } from '../esri.service';

@Component({
  selector: 'map-esri',
  templateUrl: './esri.component.html',
  styleUrls: ['./esri.component.css']
})
export class EsriComponent implements OnInit {

  map: any = null;
  vector: any  =null;
  selectionSymbol: any = null;
  constructor(public service: EsriService) { }

  ngOnInit() {


    setTimeout(() => {
      this.loadMap();
      var purple = this.service.esriColor.fromHex("#9E2CCF");
      this.selectionSymbol = new this.service.esriSimpleMarkerSymbol(this.service.esriSimpleMarkerSymbol.STYLE_SQUARE, 10,
        new this.service.esriSimpleLineSymbol(this.service.esriSimpleLineSymbol.STYLE_SOLID,
        purple, 1),
        purple)
    }, 500);
   
  }

  loadMap() {
    this.map = new this.service.map("esri-map", {slider: false, logo: false});
    this.vector  = new this.service.vector(this.service.vectorSubURL);
    this.map.addLayer(this.vector);

  }

  zoomToExtent(extent, pnt:any = null) {

    this.map.setExtent(extent);
    if(pnt) {
        this.map.graphics.clear();
        this.map.graphics.add(new this.service.esriGraphic(pnt, this.selectionSymbol));
    }
  }

}
