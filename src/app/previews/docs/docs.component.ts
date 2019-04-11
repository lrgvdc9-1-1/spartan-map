import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EsriComponent } from 'src/app/map/esri/esri.component';
import { DocsWindowComponent } from 'src/app/windows/docs-window/docs-window.component';
import { ROUTES } from 'src/app/model/api-routes';


@Component({
  selector: 'app-docs-preview',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {

  @Input() attach_id: number = 0;
  @Input() items: any = null;
  @Input() files: any = [];
  @Input() esriMap: EsriComponent = null;
  @Output() openDoc = new EventEmitter<any>();
  show: boolean = false;
  route: ROUTES = new ROUTES();
  constructor() { }

  ngOnInit() {
  }


  onZoom() {
   
    this.esriMap.clearMainGraphics();
    this.esriMap.setGraphic(this.items.geojson);
  }

  isOffice(name: string): boolean {
    let response = false;
    if(name.includes(".doc") || name.includes(".docx") ||
     name.includes(".xls") || name.includes(".xlsx") || name.includes(".ppt") || 
     name.includes(".pptx")) {
       response = true;
     }
    return response;
  }

  onDocView(fname:string) {

    let send = this.route.api.MAIN;
    let download = false;
    if(fname.includes(".pdf")) {
        send += fname;
    }else if(this.isOffice(fname)){
      send = this.route.api.OFFICE + this.route.api.MAIN +  fname;
      download = false;
    }else {
      send += fname;
      download = true;
    }
    let object = {display: true,download: download, website: send};
    this.openDoc.emit(object);

  }

  onAsk() {
      this.show = true;
  }

  onConfirm(event) {
    if(event) {

    }else {
      this.show = event;
    }
  } 

}
