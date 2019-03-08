import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-inbox',
  templateUrl: './list-inbox.component.html',
  styleUrls: ['./list-inbox.component.css']
})
export class ListInboxComponent implements OnInit {

  @Input() title: string = "";
  tickets: Array<any> = [];
  constructor() { }

  ngOnInit() {
  }

}
