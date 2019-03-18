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

  insertComment(obj):Observable<any>{
    return this.httpClient.post<any>(this.url + this.routes.api.iComment, {data: obj });
  }

  saveBookmark(obj):Observable<any> {
    return this.httpClient.post<any>(this.url + this.routes.api.sBookmark, {data: obj});
  }
}



