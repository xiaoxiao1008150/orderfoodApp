import { Component, OnInit ,Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';
import { ShopCarActions } from './shop-car.actions'
import { UserActions } from '../user/user.actions'
import { StockInfoActions } from '../stock/stock-info.actions'
// import { StockActions } from '../stock/stock.actions'
import { IAppState } from '../../store';
import { UserService } from '../providers/user.service';
import { StockService } from '../providers/stock.service';


export function x(state) {
  let filterd = state.shopcar.map(item =>item.total);
  let priceTotal = filterd.reduce(function(acc, val) {
            return acc + val;
          }, 0);
  return priceTotal;
}


// export function y(state) {
//   let order_user = state.user.filter(item =>item.isOrder==true);
//   return order_user;
// }


@Component({
  selector: 'shop-car',
  templateUrl: './shop-car.component.html',
  styleUrls: ['./shop-car.component.css']
})
export class ShopCarComponent{
  @Input() current_user;
  @select(x) priceTotal$: Observable<number>;
  @select(['shopcar']) shopcar$: Observable<any[]>;
  isOrder:Boolean = false;
  // user_shopcar:any;
  stock_item:any;
  current_stockinfo:any;
  new_user:any;
  constructor(
    public actions: ShopCarActions,
    public _UserActions: UserActions,
    public _StockInfoActions: StockInfoActions,
    public _UserService: UserService,
    public _StockService: StockService,
    private ngRedux: NgRedux<IAppState>) { }


  //order
   order(){
     let user_shopcar = this.ngRedux.getState().shopcar;
     if(JSON.stringify(user_shopcar) === JSON.stringify([]) ){
       console.log('panduan')
       alert('购物车是空的');return 
     }
     this.mycallback( 
       this.current_user,
       user_shopcar,
       function(){
          let current_user_order = this.new_user.filter(item=>{return item.name==this.current_user})
          let newObj = current_user_order[0];
          
          this._UserService.creat(newObj);

       }.bind(this));
    
    
     this.stock_item = this.ngRedux.getState().shopcar;

     let stock_item_new = this.stock_item.map(item=>({id:item.id,num:item.num}));
     let len = stock_item_new.length;
     let i;
     for(i=0;i< len;i++){

       this.test(
         stock_item_new[i],
         function(item){
          this._StockService.update(item);
         }.bind(this))
     }

   }
   //callback
  test(item,callback){
   this._StockInfoActions.updateNum(item);
   this.current_stockinfo = this.ngRedux.getState().stockinfo;
   let need_change = this.current_stockinfo.filter(stock=>(stock.id==item.id))
   callback(need_change)
  }

  mycallback(item1,item2,callback){
     this._UserActions.order(item1,item2);
     this.new_user = this.ngRedux.getState().user;
     this.isOrder = true;
       callback();
     }
  //

    


   cancelOrder(){
     this.actions.deleteAllFood()
   }

  decrementNum(food){
    if(food.num==1){
      this.actions.deleteFood(food);

    }else{
      this.actions.decrementNum(food);

    }
  }


  
}















