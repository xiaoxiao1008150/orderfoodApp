import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
// import { Food } from './food';


@Injectable()
export class NoteService{
    private headers = new Headers({'Content-Type': 'application/json'});
    private noteUrl:string;

    constructor(private _http:Http){}

 

    getNotes():Promise<any>{
     this.noteUrl = 'http://58d4f6b2663d221200a7c4f1.mockapi.io/content/notelist'
        
        return this._http.get(this.noteUrl)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
    }


    // getNote(note):Promise<any>{
    //   const url = `${this.noteUrl}/?sid=${note.sid}`;
    //     console.log('url',url);
    //     return this._http.get(url)
    //            .toPromise()
    //            .then(response => {console.log('serdata',response.json());return response.json()})
    //            .catch(this.handleError);
    // }


    
   addNote(sid,title,text): Promise<any> {
     this.noteUrl = 'http://58d4f6b2663d221200a7c4f1.mockapi.io/content/notelist';
    return this._http
      .post(this.noteUrl, JSON.stringify({sid:sid,text:text,title:title}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }



  updateNote(note): Promise<any> {
    const url = `${this.noteUrl}/${note.id}`;

    return this._http
      .put(url, JSON.stringify({title:note.title,text:note.text}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  deleteNote(note): Promise<any> {
    const url = `${this.noteUrl}/${note.id}`;
    console.log('id',note.id);
     return this._http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

 

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
 
}

