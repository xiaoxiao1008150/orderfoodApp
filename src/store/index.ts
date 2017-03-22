import { combineReducers } from 'redux';
// const persistState = require('redux-localstorage');
// import persistState from 'redux-localstorage'
import { shopCarReducer,shopCarDemo } from './shop-car.reducer';
import { stockReducer,StockDemo} from './stock.reducer';
import { userReducer,UserDemo } from './user.reducer';
import { stockInfoReducer,StockInfoDemo } from './stock-info.reducer';


export class IAppState {
  user?:UserDemo;
  shopcar?: shopCarDemo;
  stock?: StockDemo;
  stockinfo?:StockInfoDemo;
};

export const rootReducer = combineReducers<IAppState>({
  shopcar: shopCarReducer,
  stock: stockReducer,
  user: userReducer,
  stockinfo:stockInfoReducer
});

// export const enhancers = [
//   persistState('counter', { key: '@angular-redux/store/examples/counter' })
// ];
