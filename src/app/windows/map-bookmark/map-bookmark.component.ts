import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-map-bookmark',
  templateUrl: './map-bookmark.component.html',
  styleUrls: ['./map-bookmark.component.css']
})
export class MapBookmarkComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  displayTable: boolean = false;
  constructor(private service: HttpService) { }

  ngOnInit() {
  }

  onClose() {
    this.close.emit(false);
  }

  onSave() {
    
    this.service.saveBookmark({}).subscribe((response:any) => {
        console.log(response);
    });
  }

}
