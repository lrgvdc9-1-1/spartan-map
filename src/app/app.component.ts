import { Component } from '@angular/core';
import { EsriService } from './map/esri.service';
import { HttpService } from './http/http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spartan-map';

  constructor(public esriService: EsriService, private service: HttpService){
    this.service.getInbox(17).subscribe((inbox) => {
        console.log(inbox)
    });
    //console.log("HELLO  " + this.service.getInbox(26));
    
  }
}
