import { Component } from '@angular/core';
import { EsriService } from './map/esri.service';
import { ConfigsService } from './services/configs.service';
import { config } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public esriService: EsriService, public configs: ConfigsService){
   
      //If the communication pipe exists then listen for updates..
     if(window['ipc']){
       //get user information when login to the app..
       window['ipc'].on('get-user-info', (event, data:any) => {
          console.log("USER INFORMATION IS");
          console.log(data);
          configs.selfuser.setUserId(data.user_id);
          console.log(configs.selfuser);
          
       });
     }
  }
}
