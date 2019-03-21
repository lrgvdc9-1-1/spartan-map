import { Component, OnInit } from '@angular/core';
import { ConfigsService } from 'src/app/services/configs.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  displayProfile: boolean = false;
  constructor(public configs: ConfigsService) { 

    console.log(this.configs.selfuser.getFullName());
  }

  ngOnInit() {
  }

}
