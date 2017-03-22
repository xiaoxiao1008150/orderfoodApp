import { StockInfoActions } from '../app/stock/stock-info.actions';

export interface StockInfoDemo{
    id:number;
    name:string;
    price:number;
    num:number,
}

const INITIAL_STATE: StockInfoDemo[]=[];

export function stockInfoReducer(state = INITIAL_STATE, action:any) {


  switch (action.type) {
    //return is match to menu
    case StockInfoActions.ADD_TO_STOCK: 
       return action.payload
   case StockInfoActions.ADD:
    console.log('这是stockReducer');
     return [
       {
         id:action.payload.id,
         name:action.payload.name,
         price:action.payload.price,
         num:action.payload.num
       },
       ...state
     ]
    case StockInfoActions.UPDATE:
      return state.map(item => { 
        return item.id === action.payload.id ? 
        Object.assign({}, item, {name:action.payload.name,price:action.payload.price,num:action.payload.num}) : item; 
      }); 
    case StockInfoActions.DELETE:
     return  state.filter(item =>{
        return item.id !== action.payload.id
      }) 

    case StockInfoActions.UPDATE_NUM:
     return state.map(item => { 
         let current_num = item.num - action.payload.num
        return item.id === action.payload.id ? 
        Object.assign({}, item, {num:current_num}) : item; 
      });  
    default:
      return state;
  }
}
