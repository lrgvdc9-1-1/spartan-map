import { Component, OnInit,OnDestroy, Input } from '@angular/core';
import { BOOKMARK } from 'src/app/model/interface';
import { EsriComponent } from 'src/app/map/esri/esri.component';
import { EsriService } from 'src/app/map/esri.service';
import { ConfirmComponent } from 'src/app/windows/confirm/confirm.component';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-bookmark-table',
  templateUrl: './bookmark-table.component.html',
  styleUrls: ['./bookmark-table.component.css']
})
export class BookmarkTableComponent implements OnInit, OnDestroy {
  @Input() bookmarks: Array<BOOKMARK> = [];
  @Input() esriMap: EsriComponent = null;
  @Input() confirmation: ConfirmComponent;


  selected: BOOKMARK = null;

  //Need to load any services as needed...
  constructor(public esri: EsriService, public service: HttpService) { }

  ngOnInit() {

    //Listen to the Events Emitts...
    this.confirmation.action.subscribe((response:boolean) => {
      //Close confirmation window... 
      this.confirmation.display = false;
      //if response yes then delete if not dont do nada...
      if(response) {
        this.onDelete();
      }
    })
  }

  // Destroy anything not needed...
  ngOnDestroy() {

    //Once the Component is done then destroy the listener..
    this.confirmation.action.unsubscribe();
  }

  //Zoom To Selected...
  onZoom(mark: BOOKMARK) {
    
    if(typeof(mark.bookmark_json) == "string") { //If string convert to extent object so esri map can consume...
      mark.bookmark_json = new this.esri.esriExtent(JSON.parse(mark.bookmark_json));
      
    }
    if(this.esriMap) {
      //Zoom TO Extent
      this.esriMap.zoomToExtent(mark.bookmark_json);
    }
    
  }

  //Display To Confirm or delete..
  onConfirm(item) {
    this.selected = item;
    this.confirmation.display = true;
  }

  //Delete once confirm...
  onDelete() {
    this.service.deleteBookmark(this.selected).subscribe((response) => {
        this.onReload();
    });
  }

  //Once delete then reload...
  //TODO change 3 to user id from log in from user...
  onReload() {
    this.service.getBookmarks(3).subscribe((response) => {
     
      this.bookmarks = response.data;
   })
  }

}
