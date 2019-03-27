import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EsriService } from '../esri.service';
import { arcgisToGeoJSON } from '@esri/arcgis-to-geojson-utils';

declare var esri;

@Component({
  selector: 'map-esri',
  templateUrl: './esri.component.html',
  styleUrls: ['./esri.component.css']
})
export class EsriComponent implements OnInit {

  map: any = null;
  vector: any  =null;

  cityErrorsFeatures: any = null;
  cityErrorsAddress: any = null;
  selectionSymbol: any = null;
  mapExtentChange: any = null;

  public homeExtent: any = null;
  enableAttach: boolean = false;
  attachDrawing: number = 0;

  @Output() onAttachEvent = new EventEmitter<any>(); //When Attach is done..


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

  //Creates the map based on configurations...
  loadMap() {
    this.map = new this.service.map("esri-map", {slider: false, logo: false});
    this.vector  = new this.service.vector(this.service.vectorSubURL);
    this.cityErrorsFeatures = new this.service.esriFeatureLayer(this.service.cityErrorURL, {id: "ALL_ERRORS", outFields: ["*"]});
    this.cityErrorsFeatures.setDefinitionExpression("qaqc = 'ERROR' and feature_cl = 'SSAP'");
    this.cityErrorsFeatures.setFeatureReduction({
      type: "cluster",
      clusterRadius: 50
    });
    this.map.addLayer(this.vector);
    this.map.addLayer(this.cityErrorsFeatures); //Add City Errors To Share with entities..

    // Events Capture from map..
    this.map.on("load", () => {
        this.homeExtent = this.map.extent;
    });

    // Map Change

    this.map.on("click", () => {
      if(this.enableAttach && this.attachDrawing == this.service.ATTACH_OPTIONS.point){
        
        this.onAttachEvent.emit("AM DONE");
      }
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

  //Clear the main graphics from map..
  clearMainGraphics() {
    this.map.graphics.clear();
  }

  //Change the map cursor..
  setMapCursor(cursor:string) {
    this.map.setMapCursor(cursor);
  }


  //Set what option to draw on the map.

  //Can be point, polyline, or polygon..
  setDrawingOption(option: number) {
    this.attachDrawing = option;
  }

  //Enable the attachment for clicking on map.
  enAttach() {
    
    this.enableAttach = true;
  }

  //Disable the attachment for clicking on the map.
  disAttach() {
    this.enableAttach = false;
  }


}
