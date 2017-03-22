import { StockActions } from '../app/stock/stock.actions';

export interface StockDemo{
    id:number;
    name:string;
    price:number;
    num:number,
}

const INITIAL_STATE: StockDemo[]=[];

export function stockReducer(state = INITIAL_STATE, action:any) {


  switch (action.type) {
    //return is match to menu
    case StockActions.ADD_TO_MENU:
       
       return [
            {
              id: action.payload.id,
              name:action.payload.name,
              price: action.payload.price,
              num:1,
            },
            ...state
          ]
    
    case StockActions.ADD_TO_MENU_LIST:
       
       return action.payload;
         


      // case StockActions.ADD_TO_STOCK:
      //     return [
      //       {
      //         id: action.payload.id,
      //         name:action.payload.name,
      //         price: action.payload.price,
      //         num:1,
      //       },
      //       ...state
      //     ]
        
     

      // case StockActions.INCREMENT_NUM:
      // console.log('state',state);
      //   return state.map(item => { 
      //     return item.id === action.payload.id ? 
      //     Object.assign({}, item, {num:++item.num}) : item; 
      //   });


      // case StockActions.DECREMENT_NUM:
      //   return state.map(item => { 
      //     return item.id === action.payload.id ? 
      //     Object.assign({}, item,{num:--item.num}) : item; 
      //   }); 

    default:
      return state;
  }
}
