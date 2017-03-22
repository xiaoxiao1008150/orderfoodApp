import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';
// import { ShopCarActions } from './shop-car.actions'
// import { StockActions } from '../stock/stock.actions'
import { IAppState } from '../../store';
import { UserService } from '../providers/user.service';


export function x(state) {
  let filterd = state.shopcar.map(item =>item.total);
  let priceTotal = filterd.reduce(function(acc, val) {
            return acc + val;
          }, 0);
  return priceTotal;
}



@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent{
  @select(x) priceTotal$: Observable<number>;
  @select(['shopcar']) shopcar$: Observable<any[]>;

  sumTotal:any;
  current_state:any;
  userList:any
  constructor(
    public _UserService: UserService,
    private ngRedux: NgRedux<IAppState>) { }
    
  // searchOrderList(){
  //    this.userList = this._UserService.getUsers()
  //      .then(data => {
  //       this.userList = data;
  //      console.log('userlist',typeof(this.userList));
  //  })
  // }

}















