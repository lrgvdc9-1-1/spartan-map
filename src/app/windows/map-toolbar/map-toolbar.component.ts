import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { InboxComponent } from '../inbox/inbox.component';

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css']
})
export class MapToolbarComponent implements OnInit, DoCheck {
  public style: any = {};
  @Input() inbox: InboxComponent;
  constructor() { }

  ngOnInit() {

    if(this.inbox.rotate) {
      this.style = {
        position: "absolute", zIndex: 2,
        bottom: "30px", 
        left: "80px",
        width: "84%", 
        height: "40px",
        backgroundColor: "#201325"
      }
    }else {
      this.style = {
        position: "absolute", zIndex: 2,
        bottom: "30px", 
        left: "80px",
        width: "45%", 
        height: "40px",
        backgroundColor: "#201325"
      }
    }
    
  }

  ngDoCheck() {

    //If inbox change variable then do this..
    if(this.inbox.rotate) {
      console.log("CHANGE")
      console.log(this.style);
      this.style.width = "84%";
    }else {
      this.style.width = "40%";
    }
  }


  

}
