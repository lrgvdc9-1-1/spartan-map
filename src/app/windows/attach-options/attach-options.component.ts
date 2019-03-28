import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';
import { EsriComponent } from 'src/app/map/esri/esri.component';
import { ATTOPT } from 'src/app/model/interface';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-attach-options-window',
  templateUrl: './attach-options.component.html',
  styleUrls: ['./attach-options.component.css']
})
export class AttachOptionsComponent implements OnInit {
  public style: any = {};
  visible: boolean = true;
  
  pointSel: boolean = false;
  polySel: boolean = false;
  polylineSel: boolean = false;
  submitOn: boolean = false;

  @Input() esriMap:  EsriComponent; //Control the map if needed..
  @Output() close = new EventEmitter<any>(); //Tell the parent close the itself window
  files: FileList; //Hold the files upload to the system..
  
  //Options to draw on the map...
  options: ATTOPT = {
    point: 1, polyline: 2, polygon: 3
  }

  geojson: string = null;
  constructor(private http: HttpService) { }

  ngOnInit() {

    this.style = {
      position: "absolute", zIndex: 2,
      top: "50%", 
      left: "50%",
      bottom: "30px",
      width: "400px", 
      height: "330px",
      marginLeft: "-200px",
      marginTop: "-150px"
    }    

    //ON EVENT LISTENER
    //ONCE DONE DRAW ON THE MAP...
    //GET THE GEO JSON..
    this.esriMap.onAttachEvent.subscribe((response) => {
        //console.log(response);
        this.geojson = JSON.stringify(response);
        this.esriMap.setMapCursor("default");
        this.polySel = false;
        this.pointSel = false;
        this.polylineSel = false;
        this.submitOn = true;
        
    });
  }

  getHeight() {
    this.visible = !this.visible;
    if(this.visible) {
      this.style.height = "330px";
    } else {
      this.style.height = "30px";
    }
  }


  onClose() {
    this.esriMap.setMapCursor("default");
    this.esriMap.setDrawingOption(0);
    
    this.close.emit(false);
  }

  drawMap(option:number) {

    //Always enable the map cursor...
    //as well enable the attachment mode in map component..

    this.esriMap.setMapCursor("crosshair");
    
    this.esriMap.setDrawingOption(option); 
    
    if(option == this.options.point) {
        this.pointSel = true;
        this.polySel = false;
        this.polylineSel = false;
    }else if(option == this.options.polyline) {
        this.pointSel = false;
        this.polySel = false;
        this.polylineSel = true;

    }else if(option == this.options.polygon) {
        this.pointSel = false;
        this.polySel = true;
        this.polylineSel = false;
    }

  }

  onAttach() {
    //Create FormData Object...
    const formData:FormData = new FormData();
    const sFiles: number = this.files.length; //Size of the files...

    //Process all the files to add to the FormData...
    for(var x =0; x < sFiles; x++) {
      formData.append("upload[]", this.files[x], this.files[x].name);
    }

    //FormData Object
    var today = new Date();
  
    formData.append("userId", "3");
    formData.append("timestamp", today.getTime().toString());
    formData.append("geojson", this.geojson);
   // console.log(formData);

    this.http.saveAttachDoc(formData).subscribe((rs) => {
        console.log(rs);
    }, (error) => {
       //SOMETHING HAPPEN..
    });


  }

  onChange(response) {
    //console.log(response);
    this.files = response.target.files; //Hold the files selected..
    //console.log(this.files.length);
  }
}
