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
    this.map = new this.service.map("esri-map", {slider: false, logo: false});


    

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
        this.onAttachEvent.emit(response);
    });
  }


}
