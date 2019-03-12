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
  constructor() { }

  ngOnInit() {
    console.log("hey"
    )
    console.log(this.inbox);
  }

  onZOOM(item) {
    this.onZoom.next(item);
  }

}
