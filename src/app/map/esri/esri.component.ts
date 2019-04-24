import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EsriService } from '../esri.service';
import { arcgisToGeoJSON } from '@esri/arcgis-to-geojson-utils';
import { HttpService } from 'src/app/services/http.service';


//We might used don't know yet...
declare var esri;

@Component({
  selector: 'map-esri',
  templateUrl: './esri.component.html',
  styleUrls: ['./esri.component.css']
})
export class EsriComponent implements OnInit {

  map: any = null;

  //Layers 
  vector: any  =null;
  cityErrorsFeatures: any = null;
  cityErrorsAddress: any = null;
  cityBoundary: any = null;
  hParcelLayer: any = null;
  wParcelLayer: any = null;
  quickPickLayer: any = null;

  //Hold Extent change..
  holdExtent: any = null;

  //Quick Pick Variables..
  files: Array<File> = [];

  //Symbols
  selectionSymbol: any = null;
  buffSymbol:any = null;
  pointSymbol:any = null; //Tracking Variables such as extent, and home extent...
  mapExtentChange: any = null;
  public homeExtent: any = null;
  enableAttach: boolean = false;
  enableIdentify: boolean = false;
  attachDrawing: number = 0;
  dragging: boolean = false;
  public buffRadius: number = 20; //DEFAULT BUFF IS 20 meters

  //Toolbar...s
  toolbar: any = null;
  toolbarSymbols: any = {"point" : null, "line" : null, "polygon" : ""};

  //Input and Ouput Events variables..
  @Output() onAttachEvent = new EventEmitter<any>(); //When Attach is done..
  @Output() onIdentifyEvent = new EventEmitter<any>(); //When click in map is doen.
  @Input() mapOptions: any = null;

  @Output() righClick = new EventEmitter<any>();


  constructor(public service: EsriService, private http: HttpService) { }

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
    console.log(esri);
    esri.basemaps.mapflexvector = {
      baseMapLayers: [{type: "VectorTile", url: this.service.vectorSubURL}],
      thumbnailUrl: "assets/mapFlex.jpg",
      title: "MapFlex Sub Vector"
    };
    //Create map instance..
    this.map = new this.service.map("esri-map", {basemap: "mapflexvector",slider: false, logo: false});

    //Create symbols for toolbar..
    this.toolbarSymbols.point = new esri.symbol.PictureMarkerSymbol("assets/PurpleShinyPin.png", 50, 50);
    this.toolbarSymbols.line = new this.service.esriSimpleLineSymbol();
    this.toolbarSymbols.line.setColor(new this.service.esriColor([169, 0, 230, 1]));
    
    var line = new this.service.esriSimpleLineSymbol();
    line.setColor(new this.service.esriColor([132, 0, 168, 1]));
    line.setWidth(3.25);
    this.toolbarSymbols.polygon = new esri.symbol.SimpleFillSymbol();
    this.toolbarSymbols.polygon.setOutline(line);
    this.toolbarSymbols.polygon.setColor(new this.service.esriColor([255, 0, 197, 0.25]));


    this.buffSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
       new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_LONGDASHDOT, 
        new esri.Color([255,128,0,1]), 3), new esri.Color([255,128,0,0.15]));

    this.pointSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, 
      new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([0,255,0, 0.3]), 10), 
      new esri.Color([0,255,0,1]));
  
    
    
    //Load layers below..

   
    this.cityErrorsFeatures = new this.service.esriFeatureLayer(this.service.cityErrorURL, {id: "ALL_ERRORS", outFields: ["*"]});
    this.cityErrorsFeatures.setDefinitionExpression("qaqc = 'ERROR' and feature_cl = 'SSAP'");
  
    this.hParcelLayer = new this.service.esriFeatureLayer(this.service.hcadURL, {id: "hcad", outFields:["*"]})
    this.wParcelLayer = new this.service.esriFeatureLayer(this.service.wcadURL, {id: "wcad", outFields: ["*"]})


    //Quick Pick Layer..
    this.quickPickLayer = new esri.layers.GraphicsLayer();
    this.quickPickLayer.setMinScale(25000); // Set min Scale for the layer...

    //City boundary..
    this.cityBoundary = new esri.layers.ArcGISDynamicMapServiceLayer(this.service.cityURL);
    this.cityBoundary.hide();

    //Add Layers into the map...
   // this.map.addLayer(this.vector);
    this.map.addLayers([this.cityErrorsFeatures, this.quickPickLayer,this.hParcelLayer, this.wParcelLayer, this.cityBoundary]); //Add City Errors To Share with entities..
    //this.map.addLayer(new this.service.esriFeatureLayer("https://gis.lrgvdc911.org/arcgis/rest/services/Features/Parcels/FeatureServer/0", 
    //  {id:"wcad",mode: this.service.esriFeatureLayer.MODE_ONDEMAND, webglEnabled: true, showLabels: false, outFields: ["*"]}
    //));

    
    // Events Capture from map load and extent-change....
    this.map.on("load", () => {
        //Create toolbar once map is loaded.. needed...
        this.toolbar = new this.service.esriDraw(this.map, {showTooltips: false});  
        this.homeExtent = this.map.extent;
        console.log(this.map);
         //Setup Toolbar events...
         this.toolbarEvents();
    });

    //GET LEFT AND RIGHT CLICKS...
    this.map.on("click", (response) => {
        //console.log(response);

        if(this.enableIdentify) {
            //console.log(response);
            this.map.graphics.clear();

            //Turn off enable Identify..
            this.enableIdentify = false;

            this.resetMapCursor();
            let buff = esri.geometry.Circle(response.mapPoint, {"geodesic": true, "radius": this.buffRadius});
            this.zoomToExtent(buff.getExtent());

            this.map.graphics.add(new this.service.esriGraphic(response.mapPoint, this.pointSymbol));
            this.map.graphics.add(new this.service.esriGraphic(buff, this.buffSymbol));
            let mapPoint = esri.geometry.webMercatorToGeographic(response.mapPoint);
            this.onIdentifyEvent.emit({"pntCenter" : mapPoint, "buff" : buff});
        }
    });


    //Listener when extent changes on the map..
    this.map.on('extent-change', object => {

      let extent = esri.geometry.webMercatorToGeographic(object.extent);
      
      if(this.quickPickLayer.isVisibleAtScale(this.map.getScale())) {
      
        this.getCameraLayer(extent.xmin, extent.ymin, extent.xmax, extent.ymax, extent);
      }else {
        this.quickPickLayer.clear();
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

  //GET ENABLE IDENTIFY TOOL
  getIdentify():boolean {
    return this.enableIdentify;
  }

  //Get Current Map
  getMap():any{
    return this.map;
  }

  //Change the map cursor..
  setMapCursor(cursor:string) {
    this.map.setMapCursor(cursor);
  }

  resetMapCursor() {
    this.map.setMapCursor("default");
  }


  
  //Function to set Drawing Option..
  //Can be point, polyline, or polygon..
  setDrawingOption(option: number) {
    this.attachDrawing = option;
    //Activate drawing...
    if(option == this.service.ATTACH_OPTIONS.point) {
       this.toolbar.activate(this.service.esriDraw.POINT)
    }
    else if(option == this.service.ATTACH_OPTIONS.polyline) {
      this.toolbar.activate(this.service.esriDraw.POLYLINE);
    }else if(option == this.service.ATTACH_OPTIONS.polygon) {
      this.toolbar.activate(this.service.esriDraw.POLYGON);
    }

  }

  getCityLayer():any {
    return this.cityBoundary;
  }

  showCityLayer() {
    this.cityBoundary.show();
    this.cityBoundary.setVisibleLayers([0]);
  }

  showMSAGLayer() {
    this.cityBoundary.show();
    this.cityBoundary.setVisibleLayers([1]);
  }

  hideCityLayer() {
    this.cityBoundary.hide();
  }

  setIdentifyEnable(choice) {
    this.enableIdentify = choice;
  }


  setBufferRadius(buff:number) {
    this.buffRadius = buff;
  }

  //Set Graphic..
  setGraphic(geometry, symbol: any = null) {

    if(symbol){
      this.map.graphics.add(new this.service.esriGraphic(geometry, symbol));
    }else {
      
      if(geometry.type == "polyline") {
        this.map.graphics.add(new this.service.esriGraphic(geometry, this.buffSymbol));
      }else if(geometry.type == "point") {
        this.map.graphics.add(new this.service.esriGraphic(geometry, this.pointSymbol));
      }else if(geometry.type == "polygon") {
        this.map.graphics.add(new this.service.esriGraphic(geometry, this.buffSymbol));
      }
      
    }

    
   
  }

  //Control the Quick Pick Layer Visibility 
  setVisibleQuickPick(option: boolean = false) {
    
    this.quickPickLayer.setVisibility(option);
    if(!option) {
      this.quickPickLayer.clear();
      this.holdExtent = null;
    }
  }

  getQuickPickVisible():boolean {
    return this.quickPickLayer.visible;
  }


  //toolbar events...
  toolbarEvents() {
    this.toolbar.on("draw-end", (response) => {
        this.toolbar.deactivate();
        this.clearMainGraphics();

        //Add Symbology..
        if(response.geometry.type == "point") {
            this.map.graphics.add(new this.service.esriGraphic(response.geometry, this.toolbarSymbols.point));
        }
        else if(response.geometry.type == "polyline") {
           this.map.graphics.add(new this.service.esriGraphic(response.geometry, this.toolbarSymbols.line));
        }else if(response.geometry.type == "polygon") {
           this.map.graphics.add(new this.service.esriGraphic(response.geometry, this.toolbarSymbols.polygon));
        }

        //Return information to the attachment component..
        //We need to convert from 3857 to 4326
        // also make it from esri json to geo json..
        // add the crs property that it needs to save in the database...
        response.geometry = esri.geometry.webMercatorToGeographic(response.geometry);
        const geojson  = arcgisToGeoJSON(response.geometry);
        geojson['crs'] = {"type": "name", "properties": {"name": "epsg:4326"}};
        this.onAttachEvent.emit(geojson)
    });
  }

  onRightClick(event) {
  
    this.righClick.emit(event);
    return false;
  }

  changeBaseMap(key) {
    this.map.setBasemap(key);
  }

  getCameraLayer(xmin, ymin, xmax, ymax, extent:any = null) {

        this.processQuickPick(xmin, ymin, xmax, ymax);
       
    }

  processQuickPick(xmin, ymin, xmax, ymax) {
    this.quickPickLayer.clear();

    this.http.getQuickPick({data: { 
      xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax,
      orga: "6"}}).subscribe((response) => {
          if(response.success) {
            let i = response.data.length;
            while(i--)
            {
              if(response.data[i].type == "H")
              {
                this.quickPickLayer.add(new this.service.esriGraphic(new this.service.esriPoint(
                  response.data[i].x, response.data[i].y), this.service.cameraGraphics.HomeObj, response.data[i]
                ));
              }
              else if(response.data[i].type == "B")
              {  
                  this.quickPickLayer.add(new this.service.esriGraphic(new this.service.esriPoint(
                  response.data[i].x, response.data[i].y), this.service.cameraGraphics.BusObj, response.data[i]));
              }
              else if(response.data[i].type == "M")
              {
                this.quickPickLayer.add(new this.service.esriGraphic(new this.service.esriPoint(
                  response.data[i].x, response.data[i].y), this.service.cameraGraphics.MobileObj, response.data[i]));
              }
              else if(response.data[i].type == "F")
              {
                this.quickPickLayer.add(new this.service.esriGraphic(new this.service.esriPoint(
                  response.data[i].x, response.data[i].y), this.service.cameraGraphics.FireObj, response.data[i]));
              }
              else if(response.data[i].type == "N")
              {
                this.quickPickLayer.add(new this.service.esriGraphic(new this.service.esriPoint(
                  response.data[i].x, response.data[i].y), this.service.cameraGraphics.PicNewObj, response.data[i]));
              }
              else if(response.data[i].type == "S")
              {
              this.quickPickLayer.add(new this.service.esriGraphic(new this.service.esriPoint(
                  response.data[i].x, response.data[i].y), this.service.cameraGraphics.StreetSignObj, response.data[i]));
              }
            }
        }
      })
  }


  // =-=-=-=-=-=-=-= THIS IS FOR DRAG AND DROP FILES TO VIEW ON MAP SUCH AS QUICK PICK =-=-=-=-=-=-=-=-=-=-=-=-=-=
  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {

      this.dragging = false;
  }

  handleDrop(e) {
      e.preventDefault();
      this.dragging = false;
      this.files = e.dataTransfer ? e.dataTransfer.files : e.target.files;


      const formData:FormData = new FormData();
      const sFiles: number = this.files.length; 
      var today = new Date();
  
      formData.append("userId", "3");
      formData.append("orga", "6");
      formData.append("timestamp", today.getTime().toString());
     
      for(var x =0; x < sFiles; x++) {
        let name = this.files[x].name.replace(/[^a-zA-Z.[0-9]+$ ]/g, ""); 
        //Remove Any Special Characters...
        if(name.indexOf(".jpg") > 0) {
          formData.append("images[]", this.files[x], name);
        } 
       
      }
  
      this.http.uploadQuickPick(formData).subscribe((rs) => {
           console.log(rs);
      })
      console.log(this.files);

  }


}
