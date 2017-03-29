import { NoteActions } from '../app/note/note.actions';
import { UUID } from 'angular2-uuid';

export interface noteDemo{
  sid:number;
  createAt:string;
  title:string;
  text:string;
  type:string
}






const INITIAL_STATE: noteDemo[]=[];

export function noteReducer(state = INITIAL_STATE, action:any) {
  switch (action.type) {
    case NoteActions.ADD_NOTE:
       let uuid = UUID.UUID();
       console.log('uuid',uuid)
       return [
            {
              sid:uuid,
              createAt:'2012/4/5',
              title: action.payload.title,
              text:action.payload.text,
              type:null
            },
            ...state
          ]
      
      case NoteActions.UPDATE_NOTE:
        return state.map(item => { 
          return item.sid === action.payload.current_note.sid ? 
          Object.assign({}, item, {text:action.payload.text,title:action.payload.title}) : item; 
        });

      case NoteActions.DELETE_NOTE:
         return  state.filter(item =>{
          return item.sid !== action.payload.sid
        })

      case NoteActions.ADD_TO_NOTE_LIST:
        return action.payload


    
    default:
      return state;
  }
  
}
