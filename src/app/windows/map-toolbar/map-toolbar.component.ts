import { Component, OnInit, Input } from '@angular/core';
import { InboxComponent } from '../inbox/inbox.component';

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css']
})
export class MapToolbarComponent implements OnInit {
  public style: any = {};
  @Input() inbox: InboxComponent;
  constructor() { }

  ngOnInit() {

    
      this.style = {
        position: "absolute", zIndex: 2,
        bottom: "30px", 
        left: "80px",
        width: "20%", 
        height: "40px",
        backgroundColor: "#201325"
      }    
  }

}
