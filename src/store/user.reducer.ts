import { UserActions } from '../app/user/user.actions';


export interface UserDemo{
    id:number;
    name:string;
    isOrder:Boolean;
    order?:any[];
  }

const INITIAL_STATE: UserDemo[] =[]

var id=0;
export function userReducer(state = INITIAL_STATE, action:any) {
  switch (action.type) {
    case UserActions.ADD_USER:
    console.log('这是userReducer');
      return [
        {
          id:++id,
          name:action.payload,
          isOrder:false,
          order:[]
        },
        ...state
      ]
    case UserActions.DELETE:
       return  state.filter(item =>{
          return item.id !== action.payload.id
        })

    case UserActions.UPDATE:
        return state.map(item => { 
          return item.id === action.payload.id ? 
          Object.assign({}, item, {name:action.payload.name}) : item; 
        });
    case UserActions.GO_TO_ORDER:
    console.log('order')
        return state.map(item => { 
          return item.id === action.payload.id ? 
          Object.assign({}, item, {isOrder:true}) : item; 
        });

    case UserActions.USER_ORDER:
      return state.map(item => { 
          return item.name == action.payload.current_user ? 
          Object.assign({}, item, {order:action.payload.user_shopcar}) : item; 
        });

    default:
      return state;
  }
}