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
  hcadURL: string = "https://gis.lrgvdc911.org/arcgis/rest/services/Features/Parcels/FeatureServer/1";
  wcadURL: string = "https://gis.lrgvdc911.org/arcgis/rest/services/Features/Parcels/FeatureServer/0";
  cityURL: string = "https://gis.lrgvdc911.org/arcgis/rest/services/Dynamic/CityMsag/MapServer";
  loaded: boolean = false;
  map: any =  null;
  vector: any = null;
  esriMeasurement: any = null;
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

  cameraGraphics: PICK = {HOME: "assets/Home-48.png", 
    MOBILE: "assets/MHome-48.png",      PICNEW: "assets/New-48.png", STREETSIGN : "assets/Signpost-48.png",
    FIRE: "assets/Fire_Hydrant-48.png", BUSINESS : "assets/Business-48.png"
  }

  constructor() { 
    this.loadEsriModule();
  }

  loadEsriModule() {
    loadModules(["esri/Color","esri/dijit/Measurement", "esri/toolbars/draw", "esri/SpatialReference", "esri/map","esri/graphic","esri/geometry/Extent", "esri/dijit/FeatureTable", "esri/layers/FeatureLayer", "esri/layers/VectorTileLayer","esri/geometry/Circle", 
    "esri/geometry/Point", "esri/geometry/geometryEngine",
    "esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol", "esri/symbols/PictureMarkerSymbol"])
    .then(([Color,Measurement, Draw, SpatialReference, Map,Graphic,Extent, FeatureTable, 
      FeatureLayer, VectorTileLayer,Circle, Point,geometryEngine,
      SimpleMarkerSymbol,SimpleLineSymbol, PictureMarkerSymbol ]) => {
  
      this.map = Map;
      this.esriMeasurement = Measurement;
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


      //Configure the camera objects..
      this.cameraGraphics.HomeObj = new PictureMarkerSymbol(this.cameraGraphics.HOME, 30, 30);
      this.cameraGraphics.MobileObj = new PictureMarkerSymbol(this.cameraGraphics.MOBILE, 34, 34)
      this.cameraGraphics.PicNewObj = new PictureMarkerSymbol(this.cameraGraphics.PICNEW, 30, 30);
      this.cameraGraphics.StreetSignObj = new PictureMarkerSymbol(this.cameraGraphics.STREETSIGN, 30, 30);
      this.cameraGraphics.FireObj = new PictureMarkerSymbol(this.cameraGraphics.FIRE, 30, 30);
      this.cameraGraphics.BusObj  = new PictureMarkerSymbol(this.cameraGraphics.BUSINESS, 30, 30);
    });
  }
}

interface PICK {
  BUSINESS?: string;
  BusObj?: any;
  FIRE?: string;
  FireObj?: any;
  HOME?: string;
  HomeObj?: any;
  MOBILE?: string;
  MobileObj?: any;
  PICNEW?: string;
  PicNewObj?: any;
  STREETSIGN?: string;
  StreetSignObj?: any;

}
