import { Injectable } from '@angular/core';
import { loadModules } from 'esri-loader';
@Injectable({
  providedIn: 'root'
})
export class EsriService {

  //This will contain all global variables for loading esri map
  vectorSubURL: string = "https://tiles.arcgis.com/tiles/HZn9sYWTEUxVRQW9/arcgis/rest/services/MapFlex_Sub/VectorTileServer";
  cityErrorURL: string = "http://gis.lrgvdc911.org/arcgis2/rest/services/Features/CityErrors/FeatureServer/1";
  cityErrorAddURL: string = "http://gis.lrgvdc911.org/arcgis2/rest/services/Features/CityErrors/FeatureServer/0"
  loaded: boolean = false;
  map: any =  null;
  vector: any = null;
  esriColor: any = null;
  esriCircle: any = null;
  esriExtent: any = null;
  esriFeatureTable: any = null;
  esriFeatureLayer: any =null;
  esriGraphic: any = null;
  esriPoint: any = null;
  esriSpatialReference: any = null;
  esriSimpleMarkerSymbol: any = null;
  esriSimpleLineSymbol: any = null;
  esriPictureMarkerSymbol: any = null;
  esriwebMercatorUtils:any =null;

  constructor() { 
    this.loadModules();
  }

  loadModules() {
    loadModules(["esri/Color","esri/SpatialReference", "esri/map","esri/graphic","esri/geometry/Extent", "esri/dijit/FeatureTable", "esri/layers/FeatureLayer", "esri/layers/VectorTileLayer","esri/geometry/Circle", 
    "esri/geometry/Point","esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol", "esri/symbols/PictureMarkerSymbol"])
    .then(([Color,SpatialReference, Map,Graphic,Extent, FeatureTable, FeatureLayer, VectorTileLayer,Circle, Point,SimpleMarkerSymbol,SimpleLineSymbol, PictureMarkerSymbol ]) => {
     
      this.map = Map;
      this.esriExtent = Extent;
      this.esriSpatialReference = SpatialReference;
      this.esriFeatureTable = FeatureTable;
      this.esriFeatureLayer = FeatureLayer;
      this.vector     = VectorTileLayer;
      this.esriColor  = Color;
      this.esriCircle = Circle;
      this.esriGraphic = Graphic;
      this.esriPoint  = Point;
      this.esriPictureMarkerSymbol = PictureMarkerSymbol;
      this.esriSimpleLineSymbol    = SimpleLineSymbol;
      this.esriSimpleMarkerSymbol  = SimpleMarkerSymbol;
      this.loaded = true;
    });
  }
}
