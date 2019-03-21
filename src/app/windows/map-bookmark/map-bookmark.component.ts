import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { BOOKMARK } from 'src/app/model/interface';
import { EsriComponent } from 'src/app/map/esri/esri.component';
import { EsriService } from 'src/app/map/esri.service';

@Component({
  selector: 'app-map-bookmark',
  templateUrl: './map-bookmark.component.html',
  styleUrls: ['./map-bookmark.component.css']
})
export class MapBookmarkComponent implements OnInit {
  @Input() esriMap: EsriComponent;
  @Output() close = new EventEmitter<any>();
  displayTable: boolean = false;
  spatialRef: any = null;
  bookmark: BOOKMARK = {bookmark_name: "", bookmark_comments: "", user_id: 3}; 
  constructor(private service: HttpService, private esri: EsriService) { }

  ngOnInit() {
    this.spatialRef = new this.esri.esriSpatialReference(4326);
  }


  onClose() {
    this.close.emit(false);
  }

  onSave() {
     
      this.bookmark.extent = JSON.stringify(this.esriMap.map.extent);
      
    this.service.saveBookmark(this.bookmark).subscribe((response:any) => {
        console.log(response);
    });
  }

}
