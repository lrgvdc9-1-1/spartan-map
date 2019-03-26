import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';
import { EsriComponent } from 'src/app/map/esri/esri.component';

@Component({
  selector: 'app-attach-options-window',
  templateUrl: './attach-options.component.html',
  styleUrls: ['./attach-options.component.css']
})
export class AttachOptionsComponent implements OnInit {
  public style: any = {};
  visible: boolean = true;
  @Input() esriMap:  EsriComponent;
  @Output() close = new EventEmitter<any>();
  constructor() { }

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
    this.close.emit(false);
  }
}
