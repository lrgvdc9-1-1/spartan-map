import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EsriComponent } from 'src/app/map/esri/esri.component';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-identify-window',
  templateUrl: './identify.component.html',
  styleUrls: ['./identify.component.css']
})

export class IdentifyComponent implements OnInit {
  public style: any = {};
  buffer: number = 20;
  @Input() esriMap: EsriComponent;
  @Output() close = new EventEmitter<boolean>();
  constructor(private http: HttpService) { }

  ngOnInit() {

    this.style = {
      position: "absolute", zIndex: 2,
      top: "50%", 
      left: "50%",
      bottom: "30px",
      width: "400px", 
      height: "350px",
      marginLeft: "-200px",
      marginTop: "-150px"
    } 
    
    this.esriMap.onIdentifyEvent.subscribe((response) => {
        console.log(response);
        let x = response['pntCenter'].x;
        let y = response['pntCenter'].y;
        this.http.getAttachDOCS({data: {x: x,y: y, m: this.buffer}}).subscribe((res) => {

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
