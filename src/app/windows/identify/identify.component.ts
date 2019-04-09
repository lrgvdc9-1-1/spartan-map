import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EsriComponent } from 'src/app/map/esri/esri.component';
import { HttpService } from 'src/app/services/http.service';
import { geojsonToArcGIS  } from '@esri/arcgis-to-geojson-utils';

import {  SwiperConfigInterface} from 'ngx-swiper-wrapper';
declare var esri;

@Component({
  selector: 'app-identify-window',
  templateUrl: './identify.component.html',
  styleUrls: ['./identify.component.css']
})

export class IdentifyComponent implements OnInit {
  public style: any = {};
  buffer: number = 20;
  
  public config: SwiperConfigInterface = {
    a11y: false,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: false,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: false
  };
  
  
  @Input() esriMap: EsriComponent;
  
  @Output() close = new EventEmitter<boolean>();
  
  
  attachments = null;
  docSize: number = 0;
  ticketSize: number = 0;
  otherSize: number = 0;


  constructor(private http: HttpService) { }

  ngOnInit() {
    //Handles the style window...
    this.style = {
      position: "absolute", zIndex: 2,
      top: "50%", 
      left: "50%",
      bottom: "30px",
      width: "440px", 
      height: "400px",
      marginLeft: "-220px",
      marginTop: "-200px"
    } 
    
    //Communicates with esri  map events...
    this.esriMap.onIdentifyEvent.subscribe((response) => {
        //console.log(response);
        let x = response['pntCenter'].x;
        let y = response['pntCenter'].y;
        this.http.getAttachDOCS({data: {x: x,y: y, m: this.buffer}}).subscribe((res) => {
           if(res['msg']) {
                res['msg'].forEach(element => {
                  let geo = element['geojson'];
                  if(geo.type == "Point") {

                    element['geojson'] = new esri.geometry.Point(geojsonToArcGIS(element['geojson']));
                  }else if(geo.type == "LineString") {
                    element['geojson'] = new esri.geometry.Polyline(geojsonToArcGIS(element['geojson']));
                  }else if(geo.type == "Polygon") {
                    element['geojson'] = new esri.geometry.Polygon(geojsonToArcGIS(element['geojson']));
                  }
                   
                });
                this.attachments = res['msg'];
                this.docSize = this.attachments.length;
               console.log(this.attachments);
           }
        });

    });
  }

  //When window is close..
  onClose() {
    this.esriMap.clearMainGraphics();
    this.esriMap.resetMapCursor();
    this.esriMap.setIdentifyEnable(false);
    this.close.emit(false);
  }

  onReset() {
   
    if(!this.esriMap.getIdentify()) {
     
      this.esriMap.setMapCursor("pointer")//"url(assets/information.cur),auto");
      this.esriMap.setIdentifyEnable(true);
      this.esriMap.clearMainGraphics();
    }

    this.attachments = [];
    this.docSize = 0;
    this.ticketSize = 0;
    this.otherSize = 0;
    this.buffer = 0;


  }

  //on Key enter change the buffer...
  changeBuffer() {

    if(!this.esriMap.getIdentify()) {
     
      this.esriMap.setMapCursor("pointer")//"url(assets/information.cur),auto");
      this.esriMap.setIdentifyEnable(true);
      this.esriMap.clearMainGraphics();
    }
  
    this.esriMap.setBufferRadius(this.buffer);
    console.log(this.buffer);
  }

}
