import { Injectable } from '@angular/core';
import { loadModules } from 'esri-loader';
@Injectable({
  providedIn: 'root'
})
export class EsriService {

  //This will contain all global variables for loading esri map
  vectorSubURL: string = "https://tiles.arcgis.com/tiles/HZn9sYWTEUxVRQW9/arcgis/rest/services/MapFlex_Sub/VectorTileServer";

  map: any =  null;
  vector: any = null;
  esriColor: any = null;
  esriCircle: any = null;
  esriGraphic: any = null;
  esriPoint: any = null;
  esriSimpleMarkerSymbol: any = null;
  esriSimpleLineSymbol: any = null;
  esriPictureMarkerSymbol: any = null;

  constructor() { 
    this.loadModules();
  }

  loadModules() {
    loadModules(["esri/Color", "esri/map","esri/graphic", "esri/layers/VectorTileLayer","esri/geometry/Circle", 
    "esri/geometry/Point","esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol", "esri/symbols/PictureMarkerSymbol"])
    .then(([Color, Map,Graphic, VectorTileLayer,Circle, Point,SimpleMarkerSymbol,SimpleLineSymbol, PictureMarkerSymbol ]) => {
     
      this.map = Map;
      this.vector     = VectorTileLayer;
      this.esriColor  = Color;
      this.esriCircle = Circle;
      this.esriGraphic = Graphic;
      this.esriPoint  = Point;
      this.esriPictureMarkerSymbol = PictureMarkerSymbol;
      this.esriSimpleLineSymbol    = SimpleLineSymbol;
      this.esriSimpleMarkerSymbol  = SimpleMarkerSymbol;
    });
  }
}
