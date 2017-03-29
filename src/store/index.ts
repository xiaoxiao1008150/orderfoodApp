import { combineReducers } from 'redux';
// const persistState = require('redux-localstorage');
// import persistState from 'redux-localstorage'
import { noteReducer,noteDemo } from './note.reducer';
import { noteSearchReducer} from './search.reducer';


export class IAppState {
  note?:noteDemo;
  noteSearch?:noteDemo;
};

export const rootReducer = combineReducers<IAppState>({
  note: noteReducer,
  noteSearch:noteSearchReducer
});

// export const enhancers = [
//   persistState('counter', { key: '@angular-redux/store/examples/counter' })
// ];
