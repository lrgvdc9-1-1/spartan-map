import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {TICKETiNBOX} from '../../model/interface';
import { EsriComponent } from 'src/app/map/esri/esri.component';
import { EsriService } from 'src/app/map/esri.service';
import {ResizeEvent} from 'angular-resizable-element';
import { ConfigsService } from 'src/app/services/configs.service';

@Component({
  selector: 'app-inbox-window',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  @Input() esriMap: EsriComponent;
  public style: object = {};
  info: string = "This is a hinted button";
  rotate: boolean = true;
  
  inbox: Array<TICKETiNBOX> = [];
  inboxSelected: TICKETiNBOX = null;
  constructor(private service: HttpService,private config: ConfigsService, private esriService: EsriService) { }

  ngOnInit() {

      //If the communication pipe exists then listen for updates..
      if(window['ipc']){
        //get user information when login to the app..
        window['ipc'].on('get-user-info', (event, data:any) => {
           console.log("USER INFORMATION IS");
           console.log(data);
           this.config.selfuser.setUserId(data.user_id);
           console.log(this.config.selfuser);
            //Download Inbox For Panell...
           this.getInbox();
           
        });
      }
   
   // this.getInbox();
  }

  

  getInbox() {

      if(this.config.selfuser.getUserId() && this.config.selfuser.getUserId() != 0){
       console.log(this.config.selfuser);
        this.service.getInbox(this.config.selfuser.getUserId()).subscribe((inbox) => {
          var len = inbox.data.length;
          let data:Array<TICKETiNBOX> = (inbox.data.length > 0) ? inbox.data : [];
        
         // console.log(data);
          this.inbox = data;
        
      });
      }
      
  }

  onRotate() {
    this.rotate = !this.rotate;
  }
  onZoom(item: TICKETiNBOX) {

      if(item.view) {



        if(this.inboxSelected) {

          this.inboxSelected.view = false;
        }
        this.inboxSelected = item;
        if(item.x && item.y) {
          var pnt = new this.esriService.esriPoint(item.x, item.y);
          var circle = new this.esriService.esriCircle(pnt, {radius: 500});
          this.esriMap.zoomToExtent(circle.getExtent(), pnt);
        }
      }

      

      if(!item.view) {
        this.esriMap.clearMainGraphics();
        this.inboxSelected = null;
      }

     
      
  }


  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      position: 'fixed',
     
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }


}
