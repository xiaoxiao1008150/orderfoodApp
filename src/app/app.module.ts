import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { CommonModule }       from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { SearchComponent } from './search/search.component';
//ng2 material
import { MaterialModule } from '@angular/material';
import 'hammerjs';

//service
import { NoteService } from './provider/note.service';

import { AppRoutingModule}   from './app-route.module';
//redux
import { NgModule } from '@angular/core';
import { NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NoteActions } from './note/note.actions';
import { SearchActions } from './note/search.actions';




@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    NgReduxModule  
  ],
  providers: [
    NoteActions,
    NoteService,
    SearchActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
