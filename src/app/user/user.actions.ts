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
export class UserActions {
  constructor (
    private ngRedux: NgRedux<IAppState>) {}

  static ADD_USER: string = 'ADD_USER';
  static DELETE: string = 'DELETE';
  static UPDATE: string = 'UPDATE';
  static GO_TO_ORDER: string = 'GO_TO_ORDER';
  static USER_ORDER: string = 'USER_ORDER';

  order(current_user,user_shopcar):void{
    this.ngRedux.dispatch({ 
      type: UserActions.USER_ORDER,
      payload:{
        current_user:current_user,
        user_shopcar:user_shopcar
      }
    });
  }


  addUser(user): void {
    this.ngRedux.dispatch({ 
      type: UserActions.ADD_USER,
      payload:user
    });
  }


  delete(user): void {
    this.ngRedux.dispatch({ 
      type: UserActions.DELETE,
      payload:user
    });
  }

  update(user): void {
    this.ngRedux.dispatch({ 
      type: UserActions.UPDATE,
      payload:user
    });
  }

  goToOrder(user){
    this.ngRedux.dispatch({ 
      type: UserActions.GO_TO_ORDER,
      payload:user
    });
  }
 
}
