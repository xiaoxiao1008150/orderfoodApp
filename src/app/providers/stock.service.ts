import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Stock } from './stock';


@Injectable()
export class StockService{
    private headers = new Headers({'Content-Type': 'application/json'});
    private foodsUrl:string;
    private usersUrl:string;
    stocks:any;
    constructor(private _http:Http){}

 

    getStocks():Promise<Stock[]>{
        this.foodsUrl = 'http://58ca17561155bc12004f359d.mockapi.io/order/restaurant';
        return this._http.get(this.foodsUrl)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
    }


  //   getUsers():Promise<any>{
  //       this.usersUrl = 'http://58ca17561155bc12004f359d.mockapi.io/order/users';
  //       return this._http.get(this.usersUrl)
  //              .toPromise()
  //              .then(response => response.json())
  //              .catch(this.handleError);
  //   }
  //   //get 

  //  //create a new user

   create(name: string): Promise<any> {
    return this._http
      .post(this.foodsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  delete(id): Promise<any> {
    const url = `${this.foodsUrl}/${id}`;
    return this._http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(stockarr): Promise<any> {
      let stock = stockarr[0];
      const url = `${this.foodsUrl}/${stock.id}`;
      return this._http
        .put(url, JSON.stringify({num:stock.num}), {headers: this.headers})
        .toPromise()
        .then(() => stock)
        .catch(this.handleError);
    }




    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
 
}

