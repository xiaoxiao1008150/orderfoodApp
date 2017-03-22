import { ShopCarActions } from '../app/shop-car/shop-car.actions';

export interface shopCarDemo{
    id:number;
    name:string;
    price:number;
    num:number;
    total:any;
  }

const INITIAL_STATE: shopCarDemo[]=[];

export function shopCarReducer(state = INITIAL_STATE, action:any) {
  

  switch (action.type) {
    case ShopCarActions.ADD_TO_SHOPCAR:
       
       return [
            {
              id: action.payload.id,
              name:action.payload.name,
              price: action.payload.price,
              num:action.payload.num,
              total:(action.payload.price)*(action.payload.num)
            },
            ...state
          ]
        


      case ShopCarActions.DELETE_FOOD:
        return  state.filter(item =>{
          return item.id !== action.payload.id
        })
     

      case ShopCarActions.INCREMENT_NUM:
      console.log('state',state);
        return state.map(item => { 
          return item.id === action.payload.id ? 
          Object.assign({}, item, {num:++item.num,total:(item.num*item.price)}) : item; 
        });


      case ShopCarActions.DECREMENT_NUM:
        return state.map(item => { 
          return item.id === action.payload.id ? 
          Object.assign({}, item,{num:--item.num,total:(item.num*item.price)}) : item; 
        }); 

      case ShopCarActions.DELETE_ALL_FOOD:
        return []
         
    default:
      return state;
  }
}
