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
  rotate: boolean = true;
  @Input() esriMap: EsriComponent;
  inbox: Array<TICKETiNBOX> = [];
  constructor(private service: HttpService, private esriService: EsriService) { }

  ngOnInit() {

    //Download Inbox For Panell...
    this.getInbox();
  }

  

  getInbox() {
    
    this.service.getInbox(17).subscribe((inbox) => {
      
      this.inbox = (inbox.data.length > 0) ? inbox.data : [];
      console.log(this.inbox);
  });
  }

  onRotate() {
    this.rotate = !this.rotate;
  }
  onZoom(item: TICKETiNBOX) {
      console.log(item);

      var pnt = new this.esriService.esriPoint(item.x, item.y);
      console.log(pnt);
  }
}
