import { Injectable } from '@angular/core';
import { CUSER } from '../model/interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {
  public selfuser: CUSER = new CUSER();
  constructor() {
    console.log("HELLO");
    this.selfuser.getFullName();
   }

   start() {
     console.log(this.selfuser.getFullName());
   }
}
