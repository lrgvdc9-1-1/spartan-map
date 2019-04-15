import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EsriComponent } from 'src/app/map/esri/esri.component';
import { ROUTES } from 'src/app/model/api-routes';
import { HttpService } from 'src/app/services/http.service';



@Component({
  selector: 'app-docs-preview',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {

  @Input() attach_id: number = 0;
  @Input() items: any = null;
  @Input() files: Array<string> = [];
  @Input() esriMap: EsriComponent = null;
  @Output() openDoc = new EventEmitter<any>();
  show: boolean = false;
  bin: boolean = false;
  holdIndex: number = -1;
  holdName: string = "";
  route: ROUTES = new ROUTES();
  constructor(private http: HttpService) { }

  ngOnInit() {
  }


  onZoom() {
    this.bin = true;
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

  onAsk(index, fname) {
      this.holdIndex = index;
      this.holdName = fname;
      this.show = true;
  }

  onConfirm(event) {
   
    if(event) {
      
      
      //Remove the Files..
      this.files.splice(this.holdIndex,1);
      this.show = false;

      //Get The Len of current files..
      let lenFiles = this.files.length;
      let obj = {"attach_id": this.attach_id, "fname" : this.holdName }
      //If there is nothing on the array
      //Remove this record and file from server..
      //update the database as well...
      if(lenFiles == 0) {
          
          this.http.removeAllAttachDocs({data: obj}).subscribe((response) => {
            // console.log(response);
          })
      }else if(lenFiles > 0) {
        obj['file_info'] = JSON.stringify(this.items['file_info'])
        this.http.removeSingleAttachDocs({data: obj}).subscribe((response) => {
            //console.log(response);
        });
      }

      //Send http request for the delete of the file and update the database..
     
      

    }else {
      this.show = event;
    }
  } 

  onClear() {
     this.esriMap.clearMainGraphics();
     this.bin = false;
  }

}
