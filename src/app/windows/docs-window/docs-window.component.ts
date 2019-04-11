import { Component, OnInit,Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-docs-window',
  templateUrl: './docs-window.component.html',
  styleUrls: ['./docs-window.component.css']
})
export class DocsWindowComponent implements OnInit {

  @Input() website: string;
  @Output() close = new EventEmitter<boolean>();
  
  public style: any = {};

  constructor() { }

  ngOnInit() {

    this.style = {
      position: "absolute", zIndex: 2,
      top: "0", 
      left: "0",
      bottom: "30px",
      width: "80%", 
      height: "90%"
    }   
  }

  setWebsite(url: string) {
  
    
    this.website = url;
  }

  onClose() {
    this.close.emit(false);
  }

}
