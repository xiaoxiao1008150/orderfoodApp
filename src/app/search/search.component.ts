import { Component,EventEmitter,Output,
trigger,state,style,animate,transition} from '@angular/core';
import { Router }            from '@angular/router';

import { NoteService } from '../provider/note.service';
import { IAppState } from '../../store';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {noteDemo} from '../../store/note.reducer';
import { SearchActions } from '../note/search.actions';




@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('searchState', [
      state('middle', style({
        paddingTop: '130px'
      })),
      state('top',   style({
        paddingTop: '25px'
      })),
      transition('middle => top', animate('500ms ease-in-out')),
      transition('top => middle', animate('300ms ease-out'))
    ])
  ]
})
export class SearchComponent {
  @Output() searchNotes = new EventEmitter<any>();
  @select('noteSearch') noteSearch$: Observable<any[]>;


  signal = 'middle';
  term$ = new Subject<string>();
  notes:any;
  note_name:string;
  searche_notes:any;
  filterd_notes:any; 
  zero:Boolean = false;
  isShowSearchResult:Boolean = false;
  // search_result_list:any;
  title:string;
  text:string;
  current_note:any;
  cached:Boolean = false;
  isDelete = true;

    constructor(
      public actions: SearchActions,
      public service: NoteService,
      private router: Router,
      private ngRedux: NgRedux<IAppState> ) {
      this.term$
      .debounceTime(500)
      .distinctUntilChanged()  
      .subscribe(item =>this.search(item));
  }

  search(term: string): void {
    this.signal = 'top';
    this.zero = false;
    this.notes = this.ngRedux.getState().note;
    this.filterd_notes  =  this.notes.filter(item =>item.title.includes(term))
    let len = this.filterd_notes.length;
    if(len==0){this.zero=true;this.note_name=term; return}
    if(len>0){    
      this.searchNotes.emit(this.filterd_notes);
      this.isShowSearchResult = true;
      //把filterd_notes 放进store
      this.actions.addSearchNotes(this.filterd_notes)
      //
      let note = this.ngRedux.getState().noteSearch[0];
      this.showNoteText(note);
      
      }
  }

  showNoteText(note){
    this.text = note.text;
    this.title = note.title;
    this.current_note = note;
    // this.new = 'update';
  }


   saveNote(text,title){
     this.cached = true
      this.actions.updateNote(this.current_note,this.text,this.title);
   
        this.service.getNotes()
          .then(data => {
          let mynote = data.filter(item => item.sid == this.current_note.sid)
          console.log('note',mynote);
          this.service.updateNote(mynote[0])
              .then(data =>{this.cached = false});
      }) 
  }

  deleteNote(note){
    this.isDelete = false;
   
        this.service.getNotes()
          .then(data => {
          let mynote = data.filter(item => item.sid == note.sid)
          this.service.deleteNote(mynote[0])
          .then(data =>{
          this.actions.deleteNote(note);
          this.isDelete = true;
          let mynote = this.ngRedux.getState().noteSearch[0];
          this.showNoteText(mynote);
         });
      }) 


  }
}
