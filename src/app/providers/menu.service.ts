import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
// import { Food } from './food';


@Injectable()
export class MenuService{
    private headers = new Headers({'Content-Type': 'application/json'});
    private menuUrl:string;

    constructor(private _http:Http){}

 

    getMenu():Promise<any>{
        // this.menuUrl = 'http://58ca17561155bc12004f359d.mockapi.io/order/restaurant';
     this.menuUrl = 'http://58ca17561155bc12004f359d.mockapi.io/order/menu'
        
        return this._http.get(this.menuUrl)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
    }



   updateMenu(new_menu): Promise<any> {
     this.menuUrl = 'http://58ca17561155bc12004f359d.mockapi.io/order/menu';
    return this._http
      .post(this.menuUrl, JSON.stringify({list:new_menu}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  //  deleteMenu(): Promise<any> {
  //    this.menuUrl = 'http://58ca17561155bc12004f359d.mockapi.io/order/menu';
  //   return this._http
  //     .post(this.menuUrl, JSON.stringify({list:new_menu}), {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }

 

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
 
}

