import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';


@Injectable()
export class NoteActions {
  constructor (
    private ngRedux: NgRedux<IAppState>) {}
  
  static ADD_NOTE: string = 'ADD_NOTE';
  static UPDATE_NOTE: string = 'UPDATE_NOTE';
  static DELETE_NOTE: string = 'DELETE_NOTE';
  static ADD_SEARCH_NOTES: string = 'ADD_SEARCH_NOTES';
  static ADD_TO_NOTE_LIST: string = 'ADD_TO_NOTE_LIST';
  

 

  addNote(text,title): void {
    this.ngRedux.dispatch({ 
      type: NoteActions.ADD_NOTE,
      payload:{
        text:text,
        title:title
      }
    });
  }


  updateNote(current_note,text,title): void {
    this.ngRedux.dispatch({ 
      type: NoteActions.UPDATE_NOTE,
      payload:{
        current_note:current_note,
        text:text,
        title:title
      }
    });
  }

  deleteNote(note): void {
    this.ngRedux.dispatch({ 
      type: NoteActions.DELETE_NOTE,
      payload:note
    });
  }


  addToNoteList(notelist): void {
    this.ngRedux.dispatch({ 
      type: NoteActions.ADD_TO_NOTE_LIST,
      payload:notelist
    });
  }

  // addSearchNotes(searchNotes):void{
  //   this.ngRedux.dispatch({ 
  //     type: NoteActions.ADD_SEARCH_NOTES,
  //     payload:searchNotes
  //   });
  // }








 
}
