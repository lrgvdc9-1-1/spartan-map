import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  rotate: boolean = false;
  constructor() { }

  ngOnInit() {


  }

  onRotate() {
    this.rotate = !this.rotate;
  }
}
