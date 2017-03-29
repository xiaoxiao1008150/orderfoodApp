import { Component,HostListener } from '@angular/core';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { IAppState, rootReducer } from '../store/index';
// import * as createLogger from 'redux-logger';
import {NoteService} from './provider/note.service';
import{NoteActions} from './note/note.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // @HostListener('document:keyup', ['$event'])
  // onKeyUp() {
  //   // do something meaningful with it
  //   console.log(`The user just pressed !`);
  // }

    @HostListener('window:beforeunload', [ '$event' ])
    onBeforeUnload(event) {
      //浏览器关闭之前储存数据到localStorage
          let notes = this.ngRedux.getState().note;
          localStorage.setItem('notes',JSON.stringify(notes));
       

    }
  constructor(
    private ngRedux: NgRedux<IAppState>,
    public service: NoteService,
    public actions: NoteActions,
    private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {},
      // [ createLogger() ]
    )
      // [ ...enhancers, devTool.isEnabled() ? devTool.enhancer() : f => f]);
  }
}