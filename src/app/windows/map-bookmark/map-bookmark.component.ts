import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { BOOKMARK } from 'src/app/model/interface';
import { EsriComponent } from 'src/app/map/esri/esri.component';
import { EsriService } from 'src/app/map/esri.service';

@Component({
  selector: 'app-map-bookmark-window',
  templateUrl: './map-bookmark.component.html',
  styleUrls: ['./map-bookmark.component.css']
})
export class MapBookmarkComponent implements OnInit {
  @Input() esriMap: EsriComponent;
  @Output() close = new EventEmitter<any>();
  displayTable: boolean = false;
  bookmark: BOOKMARK = {bookmark_name: "", bookmark_comments: "", user_id: 3}; 
  bookmarks: Array<BOOKMARK> = [];
  constructor(private service: HttpService, private esri: EsriService) { }

  ngOnInit() {
    this.getBookMarks();
  }


  getBookMarks() {
    this.service.getBookmarks(3).subscribe((response) => {
     
      this.bookmarks = response.data;
   })
  }

  onClose() {
    this.close.emit(false);
  }

  onSave() {
     
      this.bookmark.extent = JSON.stringify(this.esriMap.map.extent);
      
    this.service.saveBookmark(this.bookmark).subscribe((response:any) => {
        this.bookmark.bookmark_name = "";
        this.bookmark.bookmark_comments = "";
        this.getBookMarks();
    });
  }

}
