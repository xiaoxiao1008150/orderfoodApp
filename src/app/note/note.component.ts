import { Component, HostListener,OnInit,ViewChild,Renderer,AfterViewInit,ElementRef } from '@angular/core';
import { trigger,state,style,animate,transition} from '@angular/core';
import { NoteActions } from './note.actions';
import { NoteService } from '../provider/note.service';
import { IAppState } from '../../store';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
//svg
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';


export function y(state) {
     let len = state.note.length;
  return len;
}



@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  animations: [
    trigger('writeState', [
      state('no', style({
        // width: '130px'
      })),
      state('yes',   style({
        width: '95%',
      })),
      transition('no => yes', animate('500ms ease-in-out')),
      transition('yes => no', animate('300ms ease-out'))
    ]),

    trigger('titleState', [
      state('no', style({
        // marginLeft:'-370px';
      })),
      state('yes',   style({
        marginLeft:'-370px'
      })),
      transition('no => yes', animate('500ms ease-in-out')),
      transition('yes => no', animate('300ms ease-out'))
    ])
  ]

})
export class NoteComponent implements OnInit {
  @select('note') notes$: Observable<any[]>;
  @select(y) noteLength$: Observable<any[]>;
  @ViewChild('input') input:ElementRef;




  screenfull = 'no';
  isShirnk:Boolean = false;
  notes :any;
  current_note:any;
  text:string = '';
  title:string ='';
  show:Boolean = false;
  new:string;
  isShowSearch:Boolean = false;
  noteList:any;
  cached:Boolean = false;
  isLoading:Boolean = true;
  id:number;
  showCancel:Boolean = false;
  isDelete = true;

  // submit:string;
  constructor(
      iconRegistry: MdIconRegistry, sanitizer: DomSanitizer,
      private renderer: Renderer,
      public actions: NoteActions,
      // private router: Router,
      public _NoteService: NoteService,
      private ngRedux: NgRedux<IAppState> ) {

      iconRegistry.addSvgIcon(
      'settings-overscan',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/screenfull.svg'));
    // this.term$
    // .debounceTime(500)
    // .subscribe(item =>this.addNote(item));
  }
  ngOnInit() {

    let notes = JSON.parse(localStorage.getItem('note'))
    if(notes){
       this.actions.addToNoteList(this.noteList);
    }else{

    this._NoteService.getNotes()
          .then(data => {
            // console.log('data',data);
            this.isLoading = false;
            this.noteList = data.map(item=>{return item})
            this.actions.addToNoteList(this.noteList)
            console.log('statenote',this.ngRedux.getState().note)
          })  
    }
     // this._NoteService.getNotes(data =>{this.noteList = data})

  }
  // sort(){
  //   this.isSort = true;
  // }
  spread(){
    this.screenfull = 'yes';
    this.isShirnk = true;
    console.log('yes')
  }

  shirnk(){
    this.screenfull = 'no';
    this.isShirnk = false;
  }
  //textarea focus
  add(){
    this.renderer.invokeElementMethod(this.input.nativeElement,    
    'focus');
    this.text= '';
    this.title= '';
    this.show = true;
    this.new = 'new';
    this.showCancel = true;


    //这里有个动画

  }

  cancel(){
    this.show = false;
    this.text ='';
    this.title = '';
  }

  showNoteText(note){
    this.text = note.text;
    this.title = note.title;
    this.current_note = note;
    this.new = 'update';
  }

  saveNote(text,title){
    
    if(text=='' && title==''){return}
    if(this.new=='update'){
      this.cached = true;
      this.actions.updateNote(this.current_note,this.text,this.title);
      //


      this._NoteService.getNotes()
          .then(data => {
          let mynote = data.filter(item => item.sid == this.current_note.sid)
          console.log('note',mynote);
          this._NoteService.updateNote(mynote[0])
              .then(data =>{this.cached = false});
      })  

      //
    }else{
      this.cached = true;
      this.showCancel = false;
      this.actions.addNote(text,title);
      let new_note = this.ngRedux.getState().note[0];
      let sid = new_note.sid
      // this.submit = 'yes'
      //将数据存到数据库中
      this._NoteService.addNote(sid,title,text)
           .then(data =>{this.cached = false;
      //
      // let new_note = this.ngRedux.getState().note[0];
      this.showNoteText(new_note)
});
      this.show = false;
    }

  }


  deleteNote(note){

    this.isDelete = false;

    //通过action的 sid 拿到 api 的 id
     this._NoteService.getNotes()
          .then(data => {
          let mynote = data.filter(item => item.sid == note.sid)
          this._NoteService.deleteNote(mynote[0])
          .then(()=>{
            this.actions.deleteNote(note);
            this.isDelete = true;
            let mynote = this.ngRedux.getState().note[0];
            // 
            this.showNoteText(mynote); 
          })
      })
    //
   

   
  }

  search(){
    this.isShowSearch = true;
    sessionStorage.setItem('test',JSON.stringify(this.isShowSearch))
    console.log(JSON.parse(sessionStorage.getItem('test')))
  }


  searchNotes(notes){
    this.isShowSearch = true;

  }

  goToNote(){
    console.log('test');
    this.isShowSearch = false;
  }
}
