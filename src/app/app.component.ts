import { Component } from '@angular/core';
import { EsriService } from './map/esri.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public esriService: EsriService){
   
  }
}
