import { Component, OnInit,OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { EsriComponent } from 'src/app/map/esri/esri.component';

@Component({
  selector: 'app-right-click-menu-window',
  templateUrl: './right-click-menu.component.html',
  styleUrls: ['./right-click-menu.component.css']
})
export class RightClickMenuComponent implements OnInit, OnDestroy {

  @Input() esriMap: EsriComponent = null;
  @Input() style = {
    position: "absolute", zIndex: 2,
    bottom: "30px",
    top: "0", 
    left: "80px",
    width: "120px", 
    height: "200px",
    display: "none",
    border: "1px solid #602643",
    boxShadow: "1px 1px 2px #602643",
    backgroundColor: "#201325"
  };

  constructor() { }

  ngOnInit() {

    //Listent to the right click events from esri map...
    this.esriMap.righClick.subscribe((event) => {
        this.style.display = "block";
        this.style.left = (event.pageX - 20) + "px";
        this.style.top = event.pageY + "px";
    });
  }

  // To Destroy all the subscribe listeners ....
  ngOnDestroy() {
    this.esriMap.righClick.unsubscribe();
  }

  onClose() {
    this.style.display = "none";
  }

}
