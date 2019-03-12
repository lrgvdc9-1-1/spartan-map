import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {TICKETiNBOX} from '../../model/interface';
import { EsriComponent } from 'src/app/map/esri/esri.component';
import { EsriService } from 'src/app/map/esri.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  info: string = "This is a hinted button";
  rotate: boolean = false;
  @Input() esriMap: EsriComponent;
  inbox: Array<TICKETiNBOX> = [];
  inboxSelected: TICKETiNBOX = null;
  constructor(private service: HttpService, private esriService: EsriService) { }

  ngOnInit() {

    //Download Inbox For Panell...
    this.getInbox();
  }

  

  getInbox() {
    
    this.service.getInbox(17).subscribe((inbox) => {
      var len = inbox.data.length;
      let data:Array<TICKETiNBOX> = (inbox.data.length > 0) ? inbox.data : [];
      for(var i = 0; i < len; i++) {
         data[i].created_date = new Date(data[i].created_date);

      }
      console.log(data);
      this.inbox = data;
     
  });
  }

  onRotate() {
    this.rotate = !this.rotate;
  }
  onZoom(item: TICKETiNBOX) {

      if(item.view) {



        if(this.inboxSelected) {

          this.inboxSelected.view = true;
        }
        this.inboxSelected = item;
        if(item.x && item.y) {
          var pnt = new this.esriService.esriPoint(item.x, item.y);
          var circle = new this.esriService.esriCircle(pnt, {radius: 500});
          this.esriMap.zoomToExtent(circle.getExtent(), pnt);
        }
      }

      item.view = !item.view;

      if(item.view) {
        this.esriMap.clearMainGraphics();
        this.inboxSelected = null;
      }

     
      
  }
}
