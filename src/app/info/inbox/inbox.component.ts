import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  info: string = "This is a hinted button";
  rotate: boolean = true;
  constructor() { }

  ngOnInit() {


  }

  onRotate() {
    this.rotate = !this.rotate;
  }
}
