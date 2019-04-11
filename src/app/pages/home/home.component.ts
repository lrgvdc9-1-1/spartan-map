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
  identify: boolean = false;
  docView: boolean = false;
  url:string = ""
  constructor() { }

  ngOnInit() {
  }

  onBookMarkClose(value) {
    this.bookmark = value;

  }


  openDocsWindow(event) {
    this.docView = event.display;
   if(!event.download) {
    this.url = event.website;
   }else { //Lets Download

   }
  

  }

}
