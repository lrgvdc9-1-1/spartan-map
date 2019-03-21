import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { BOOKMARK } from 'src/app/model/interface';

@Component({
  selector: 'app-map-bookmark',
  templateUrl: './map-bookmark.component.html',
  styleUrls: ['./map-bookmark.component.css']
})
export class MapBookmarkComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  displayTable: boolean = false;
  bookmark: BOOKMARK = {bookmark_name: "", bookmark_comments: ""}; 
  constructor(private service: HttpService) { }

  ngOnInit() {
  }

  onClose() {
    this.close.emit(false);
  }

  onSave() {
      console.log(this.bookmark);
    // this.service.saveBookmark({}).subscribe((response:any) => {
    //     console.log(response);
    // });
  }

}
