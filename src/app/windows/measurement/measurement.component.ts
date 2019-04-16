import { Component, OnInit,OnDestroy,  Output, EventEmitter, Input } from '@angular/core';
import { EsriService } from 'src/app/map/esri.service';
import { EsriComponent } from 'src/app/map/esri/esri.component';

@Component({
  selector: 'app-measurement-window',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit, OnDestroy {
  public style: any = {};
  
  @Input() esriMap: EsriComponent = null;
  @Output() close = new EventEmitter<boolean>();
  measurement: any = null;
  constructor(private esri: EsriService) { }

  ngOnInit() {

    this.style = {
      position: "absolute", zIndex: 2,
      top: "0", 
      left: "0",
      bottom: "30px",
      width: "20%", 
      height: "30%"
    }   




    //Setup new measurement
  
      if(this.esriMap) {
       
        this.measurement = new this.esri.esriMeasurement({
          map: this.esriMap.getMap()
        }, document.getElementById("ms"));
        
        this.measurement.startup();
      }
    
   
    

  }

  ngOnDestroy() {
    if(this.measurement) {
      this.measurement.destroy();
    }
  }

  onClose() {
    this.close.emit(false);
  }

}
