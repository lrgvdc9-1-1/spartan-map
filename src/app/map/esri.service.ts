import { Injectable } from '@angular/core';
import { loadModules } from 'esri-loader';
import { ATTOPT } from '../model/interface';
@Injectable({
  providedIn: 'root'
})
export class EsriService {

  //This will contain all global variables for loading esri map
  vectorSubURL: string = "https://tiles.arcgis.com/tiles/HZn9sYWTEUxVRQW9/arcgis/rest/services/MapFlex_Sub/VectorTileServer";
  cityErrorURL: string = "https://gis.lrgvdc911.org/arcgis/rest/services/Features/CityErrors/FeatureServer/1";
  cityErrorAddURL: string = "https://gis.lrgvdc911.org/arcgis/rest/services/Features/CityErrors/FeatureServer/0"
  loaded: boolean = false;
  map: any =  null;
  vector: any = null;
  esrigeometryEngine: any = null;
  esriColor: any = null;
  esriCircle: any = null;
  esriDraw: any   = null;
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

  ATTACH_OPTIONS: ATTOPT = {
    point: 1, polyline: 2, polygon: 3
  }

  constructor() { 
    this.loadModules();
  }

  loadModules() {
    loadModules(["esri/Color", "esri/toolbars/draw", "esri/SpatialReference", "esri/map","esri/graphic","esri/geometry/Extent", "esri/dijit/FeatureTable", "esri/layers/FeatureLayer", "esri/layers/VectorTileLayer","esri/geometry/Circle", 
    "esri/geometry/Point", "esri/geometry/geometryEngine",
    "esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol", "esri/symbols/PictureMarkerSymbol"])
    .then(([Color,Draw, SpatialReference, Map,Graphic,Extent, FeatureTable, 
      FeatureLayer, VectorTileLayer,Circle, Point,geometryEngine,
      SimpleMarkerSymbol,SimpleLineSymbol, PictureMarkerSymbol ]) => {
  
      this.map = Map;
      this.esrigeometryEngine = geometryEngine;
      this.esriDraw = Draw;
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
