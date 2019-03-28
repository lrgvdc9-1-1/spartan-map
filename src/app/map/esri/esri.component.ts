import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EsriService } from '../esri.service';
import { arcgisToGeoJSON } from '@esri/arcgis-to-geojson-utils';


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
  
  //Symbols
  selectionSymbol: any = null;

  //Tracking Variables such as extent, and home extent...
  mapExtentChange: any = null;
  public homeExtent: any = null;
  enableAttach: boolean = false;
  attachDrawing: number = 0;

  //Toolbar...s
  toolbar: any = null;
  toolbarSymbols: any = {"point" : null, "line" : null, "polygon" : ""};

  //Input and Ouput Events variables..
  @Output() onAttachEvent = new EventEmitter<any>(); //When Attach is done..
  @Input() mapOptions: any = null;

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
    console.log(esri);
    //Create map instance..
    this.map = new this.service.map("esri-map", {slider: false, logo: false});

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

    
    
    //Load layers below..

    this.vector  = new this.service.vector(this.service.vectorSubURL);
    this.cityErrorsFeatures = new this.service.esriFeatureLayer(this.service.cityErrorURL, {id: "ALL_ERRORS", outFields: ["*"]});
    this.cityErrorsFeatures.setDefinitionExpression("qaqc = 'ERROR' and feature_cl = 'SSAP'");
    this.cityErrorsFeatures.setFeatureReduction({
      type: "cluster",
      clusterRadius: 50
    });

    //Add Layers into the map...
    this.map.addLayer(this.vector);
    this.map.addLayer(this.cityErrorsFeatures); //Add City Errors To Share with entities..

    // Events Capture from map load and extent-change....
    this.map.on("load", () => {
        //Create toolbar once map is loaded.. needed...
        this.toolbar = new this.service.esriDraw(this.map, {showTooltips: false});  
        this.homeExtent = this.map.extent;
         //Setup Toolbar events...
         this.toolbarEvents();
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


}
