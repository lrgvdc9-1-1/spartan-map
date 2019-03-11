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

  constructor(public service: EsriService) { }

  ngOnInit() {


    setTimeout(() => {
      this.loadMap();
    }, 500);
   
  }

  loadMap() {
    this.map = new this.service.map("esri-map", {slider: false, logo: false});
    this.vector  = new this.service.vector(this.service.vectorSubURL);
    this.map.addLayer(this.vector);

  }

  zoomToExtent(extent) {

    this.map.setExtent(extent);
  }

}
