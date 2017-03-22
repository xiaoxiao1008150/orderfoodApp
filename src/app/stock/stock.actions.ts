import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';

/**
 * Action creators in Angular 2. We may as well adopt a more
 * class-based approach to satisfy Angular 2's OOP idiom. It
 * has the advantage of letting us use the dependency injector
 * as a replacement for redux-thunk.
 */
@Injectable()
export class StockActions {
  constructor (
    private ngRedux: NgRedux<IAppState>,
  ) {}

  static ADD_TO_MENU: string = 'ADD_TO_MENU';
  static DECREMENT_NUM: string = 'DECREMENT_NUM';
  static INCREMENT_NUM: string = 'INCREMENT_NUM';
  static ADD_TO_MENU_LIST: string = 'ADD_TO_MENU_LIST';
  // static ADD_TO_STOCK: string = 'ADD_TO_STOCK';

  addToMenu(stock): void {
    this.ngRedux.dispatch({ 
      type: StockActions.ADD_TO_MENU,
      payload:stock
    });
  }
  
  addToMenuList(stocks):void{
     this.ngRedux.dispatch({ 
      type: StockActions.ADD_TO_MENU_LIST,
      payload:stocks
    });
  }
  // addToStock(stocks){
  //    this.ngRedux.dispatch({ 
  //     type: StockActions.ADD_TO_STOCK,
  //     payload:stocks
  //   });
  // }

  // decrementNum(food): void {
  //   this.ngRedux.dispatch({ 
  //     type: StockActions.DECREMENT_NUM ,
  //     payload:food
  //   });
  // }


  // incrementNum(food): void {
  //   this.ngRedux.dispatch({ 
  //     type: StockActions.DECREMENT_NUM ,
  //     payload:food
  //   });
  // }


}
