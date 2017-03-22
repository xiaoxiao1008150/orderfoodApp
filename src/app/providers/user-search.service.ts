import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import {Users} from './users';



@Injectable()
export class UserSearchService {
  private usersUrl:string;
  constructor(private _http: Http) {}

    //search

    search(term: string): Observable<Users[]> {
      this.usersUrl = 'http://58ca17561155bc12004f359d.mockapi.io/order/users';
      return this._http
               .get(`${this.usersUrl}?name=${term}`)
               .map(response => response.json());
    }

}