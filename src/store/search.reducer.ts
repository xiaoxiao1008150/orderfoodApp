import { SearchActions } from '../app/note/search.actions';
import { noteDemo } from './note.reducer';


const INITIAL_STATE: noteDemo[]=[];
// let id = 0;
export function noteSearchReducer(state = INITIAL_STATE, action:any) {
  switch (action.type) {
    

      case SearchActions.ADD_SEARCH_NOTES:
         return action.payload

     case SearchActions.UPDATE_NOTE:
      return state.map(item => { 
        return item.sid === action.payload.current_note.sid ? 
        Object.assign({}, item, {text:action.payload.text,title:action.payload.title}) : item; 
      });

     case SearchActions.DELETE_NOTE:
         return  state.filter(item =>{
          return item.sid !== action.payload.sid
        })


    
    default:
      return state;
  }
  
}
