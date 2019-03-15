import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TICKETiNBOX } from 'src/app/model/interface';

@Component({
  selector: 'app-list-inbox',
  templateUrl: './list-inbox.component.html',
  styleUrls: ['./list-inbox.component.css']
})
export class ListInboxComponent implements OnInit {

  @Input() title: string = "";
  @Input() inbox: Array<TICKETiNBOX> = [];
  @Output() onZoom = new EventEmitter<any>();
  onAddComment: boolean = false;
  cmntOn: boolean = false;
  constructor() { }

  ngOnInit() {
   
  }

  onZOOM(item:TICKETiNBOX) {


    if(item.x == 0 && item.y == 0) {
      item.zoomIn = true;
      return;
    }
    item.view = !item.view;
    item.zoomIn = false;
    this.onZoom.next(item);
  }

  onAddC(item) {
    item.comment = true;
    this.onAddComment = !this.onAddComment;
  }

}
