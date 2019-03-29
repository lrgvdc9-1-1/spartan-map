import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  bookmark:boolean = false;
  attach: boolean = false;
  toolbar: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  onBookMarkClose(value) {
    this.bookmark = value;

  }

}
