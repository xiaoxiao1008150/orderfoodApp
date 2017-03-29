import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';


@Injectable()
export class SearchActions {
  constructor (
    private ngRedux: NgRedux<IAppState>) {}
  
  
  static ADD_SEARCH_NOTES: string = 'ADD_SEARCH_NOTES';
  static UPDATE_NOTE: string = 'UPDATE_NOTE';
  static DELETE_NOTE: string = 'DELETE_NOTE';
  
  addSearchNotes(searchNotes):void{
    this.ngRedux.dispatch({ 
      type: SearchActions.ADD_SEARCH_NOTES,
      payload:searchNotes
    });
  }


  updateNote(current_note,text,title): void {
    this.ngRedux.dispatch({ 
      type: SearchActions.UPDATE_NOTE,
      payload:{
        current_note:current_note,
        text:text,
        title:title
      }
    });
  }

  deleteNote(note): void {
    this.ngRedux.dispatch({ 
      type: SearchActions.DELETE_NOTE,
      payload:note
    });
  }
  








 
}
