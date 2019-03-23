import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attach-options',
  templateUrl: './attach-options.component.html',
  styleUrls: ['./attach-options.component.css']
})
export class AttachOptionsComponent implements OnInit {
  public style: any = {};
  visible: boolean = true;
  constructor() { }

  ngOnInit() {

    this.style = {
      position: "absolute", zIndex: 2,
      top: "50%", 
      left: "50%",
      bottom: "30px",
      width: "400px", 
      height: "300px",
      marginLeft: "-200px",
      marginTop: "-150px"
    }    
  }

  getHeight() {
    this.visible = !this.visible;
    if(this.visible) {
      this.style.height = "300px";
    } else {
      this.style.height = "30px";
    }
  }
}
