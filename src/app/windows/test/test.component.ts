import { Component, OnInit, Input } from '@angular/core';
import { EsriComponent } from 'src/app/map/esri/esri.component';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-test-window',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @Input() attach_id: number = 0;
  @Input() items: any = null;
  @Input() files: any = [];
  @Input() esriMap: EsriComponent = null;
  constructor() { }

  ngOnInit() {
  }


  onZoom() {
    console.log(this.items);
    this.esriMap.clearMainGraphics();
    this.esriMap.setGraphic(this.items.geojson);
  }
}
