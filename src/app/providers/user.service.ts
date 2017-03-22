import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Users } from './users';


@Injectable()
export class UserService{
    private headers = new Headers({'Content-Type': 'application/json'});
    private foodsUrl:string;
    private usersUrl:string;

    constructor(private _http:Http){}

    getUsers(): Promise<Users[]> {
     this.usersUrl = 'http://58ca17561155bc12004f359d.mockapi.io/order/users'
    return this._http.get(this.usersUrl)
      .toPromise()
      .then(response => {console.log('res',response.json());return response.json()})
      .catch(this.handleError);
  }



  

   creat(newObj): Promise<any> {
     this.usersUrl = 'http://58ca17561155bc12004f359d.mockapi.io/order/users'
    return this._http
      .post(this.usersUrl, JSON.stringify(newObj), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
 
}

