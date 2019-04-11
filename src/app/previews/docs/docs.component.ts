import { Component, OnInit, Input } from '@angular/core';
import { EsriComponent } from 'src/app/map/esri/esri.component';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {

  @Input() attach_id: number = 0;
  @Input() items: any = null;
  @Input() files: any = [];
  @Input() esriMap: EsriComponent = null;
  constructor() { }

  ngOnInit() {
  }


  onZoom() {
   
    this.esriMap.clearMainGraphics();
    this.esriMap.setGraphic(this.items.geojson);
  }

}
