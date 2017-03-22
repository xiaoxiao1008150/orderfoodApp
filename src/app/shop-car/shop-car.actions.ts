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
export class ShopCarActions {
  constructor (
    private ngRedux: NgRedux<IAppState>
  ) {}

  static ADD_TO_SHOPCAR: string = 'ADD_TO_SHOPCAR';
  static DECREMENT_NUM: string = 'DECREMENT_NUM';
  static INCREMENT_NUM: string = 'INCREMENT_NUM';
  static DELETE_FOOD: string = 'DELETE_FOOF';
  static DELETE_ALL_FOOD: string = 'DELETE_ALL_FOOD';

  addToShopCar(food): void {
    this.ngRedux.dispatch({ 
      type: ShopCarActions.ADD_TO_SHOPCAR,
      payload:food
     });
  }

  decrementNum(food): void {
    this.ngRedux.dispatch({ 
      type: ShopCarActions.DECREMENT_NUM ,
      payload:food
    });
  }

  incrementNum(food): void {
    this.ngRedux.dispatch({
     type: ShopCarActions.INCREMENT_NUM,
     payload:food
    });
  }

  //
  deleteFood(food):void{
    this.ngRedux.dispatch({
     type: ShopCarActions.DELETE_FOOD,
     payload:food
    });
  }

  deleteAllFood():void{
    this.ngRedux.dispatch({
     type: ShopCarActions.DELETE_ALL_FOOD
    });
  }



 


}
