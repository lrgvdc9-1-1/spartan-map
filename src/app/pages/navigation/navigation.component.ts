import { Component, OnInit } from '@angular/core';
import { ConfigsService } from 'src/app/services/configs.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
 
})
export class NavigationComponent implements OnInit {
  widthPane: string = "48px";
  subtrack: number = 50;
  widthContent: string = "";
  displayProfile: boolean = false;
  constructor(public configs: ConfigsService) { 

    console.log(this.configs.selfuser.getFullName());
  }

  ngOnInit() {
    this.widthContent = (document.body.clientWidth - this.subtrack) + "px";
  }
  onCSS() {
    this.displayProfile = !this.displayProfile;
    if(this.displayProfile) {
        this.widthPane = "280px";
        this.subtrack = 280;
        this.widthContent = (document.body.clientWidth - this.subtrack) + "px";
    }
    else {
      this.widthPane = "48px";
      this.subtrack = 50;
      this.widthContent = (document.body.clientWidth - this.subtrack) + "px";
    }
  }

  onResize(event) {
      console.log(event.target.innerWidth);
      this.widthContent = (event.target.innerWidth - this.subtrack) + "px";
      console.log(this.widthContent);
  }

 
}
