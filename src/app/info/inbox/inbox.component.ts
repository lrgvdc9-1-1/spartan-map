import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';
import {TICKETiNBOX} from '../../model/interface';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  info: string = "This is a hinted button";
  rotate: boolean = true;
  inbox: Array<TICKETiNBOX> = [];
  constructor(private service: HttpService) { }

  ngOnInit() {

    //Download Inbox For Panell...
    this.getInbox();
  }

  onRotate() {
    this.rotate = !this.rotate;
  }

  getInbox() {
    
    this.service.getInbox(17).subscribe((inbox) => {
      
      this.inbox = (inbox.data.length > 0) ? inbox.data : [];
      console.log(this.inbox);
  });
  }
}
