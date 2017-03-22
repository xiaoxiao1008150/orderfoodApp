import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';


@Injectable()
export class StockInfoActions {
  constructor (
    private ngRedux: NgRedux<IAppState>,
  ) {}

 
  static ADD_TO_STOCK: string = 'ADD_TO_STOCK';
  static UPDATE: string = 'UPDATE';
  static UPDATE_NUM: string = 'UPDATE_NUM';
  static DELETE: string = 'DELETE';
  static ADD: string = 'ADD';


  addToStock(stocks){
     this.ngRedux.dispatch({ 
      type: StockInfoActions.ADD_TO_STOCK,
      payload:stocks
    });
  }

  add(stock){
     this.ngRedux.dispatch({ 
      type: StockInfoActions.ADD,
      payload:stock
    });
  }


  updateNum(stock):void{
    this.ngRedux.dispatch({ 
        type: StockInfoActions.UPDATE_NUM,
        payload:stock
      });
  }
 update(stock): void {
    this.ngRedux.dispatch({ 
      type: StockInfoActions.UPDATE,
      payload:stock
    });
  }

  delete(stock): void {
    this.ngRedux.dispatch({ 
      type: StockInfoActions.DELETE,
      payload:stock
    });
  }
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
