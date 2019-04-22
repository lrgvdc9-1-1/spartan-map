import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ROUTES } from '../model/api-routes';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class HttpService {
  url: string = "https://gis.lrgvdc911.org/php/spartan/api/v2/index.php/";
  routes: ROUTES = new ROUTES();

  constructor(private  httpClient:HttpClient) { }


  getInbox(userid: number): Observable<any>{
      //console.log(this.url + this.routes.api.inbox);
      return this.httpClient.post<any>(this.url + this.routes.api.inbox, {data: userid});
  }

  getComments(ticket:number):Observable<any>{
    return this.httpClient.get<any>(this.url + this.routes.api.gComments + ticket);
  }

  getBookmarks(userid: number):Observable<any>{
    return this.httpClient.get<any>(this.url + this.routes.api.gBookmark + userid);
  }

  insertComment(obj):Observable<any>{
    return this.httpClient.post<any>(this.url + this.routes.api.iComment, {data: obj });
  }

  deleteBookmark(obj):Observable<any> {
    
    return this.httpClient.post<any>(this.url + this.routes.api.dBookmark, {data: obj});
  }

  saveBookmark(obj):Observable<any> {
    return this.httpClient.post<any>(this.url + this.routes.api.sBookmark, {data: obj});
  }

  saveAttachDoc(obj):Observable<any> {
    return this.httpClient.post<any>(this.url + this.routes.api.sAttachDoc, obj);
  }


  getAttachDOCS(obj) :Observable<any> {
    return this.httpClient.post<any>(this.url + this.routes.api.gAttachDoc, obj);
  }
  getTicketsByGeom(obj): Observable<any>{
    return this.httpClient.post<any>(this.url + this.routes.api.gisTickets, obj);
  }
  removeAllAttachDocs(obj):Observable<any> {
    return this.httpClient.post<any>(this.url + this.routes.api.dAllAttachDocs, obj);
  }

  removeSingleAttachDocs(obj):Observable<any> {
    return this.httpClient.post<any>(this.url + this.routes.api.rAttachDocs, obj);
  }

}



