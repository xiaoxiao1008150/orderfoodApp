import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

//redux
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ShopCarActions } from '../shop-car/shop-car.actions';
import { IAppState } from '../../store';
import { MenuService } from '../providers/menu.service';
import { StockActions } from '../stock/stock.actions';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  @select('stock') foods$: Observable<any[]>;

  isUpdate:boolean=false;
  users:any;
  test:any;
  order_user;string;
  isShowName:Boolean = false;
  isDisabled:Boolean = true;
  current_stock:any;
  menuList = [];
  before_stock:any;
  constructor(
      // private _UsersService:UsersService,
      private router: Router,
      public actions: ShopCarActions,
      public _StockActions: StockActions,
      public _MenuService: MenuService,
      private ngRedux: NgRedux<IAppState>) {}

  onVoted(agreed: boolean) {
    this.isDisabled = agreed;
  }

  changeMenu(){
    //从api获取数据
    this._MenuService.getMenu()
        .then(data=>{
          //
         let before= data;
         let before_stock= before.map(item=>item.list)
         //获取当前stock的数据
         let current_stock = this.ngRedux.getState().stock;
      //去掉相同的对象,before_stock
      var arr3 = [];
      for(var i in before_stock){
         var shared = false;
         for (var j in current_stock)
             if (current_stock[j].name == before_stock[i].name) {
                 shared = true;
                 break;
             }
         if(!shared) arr3.push(before_stock[i])
      }
      console.log('arr3',arr3)
    //

     //去掉相同的对象,current_stock
      var arr4 = [];
      for(var k in current_stock){
         var shared = false;
         for (var l in before_stock)
             if (before_stock[l].name == current_stock[k].name) {
                 shared = true;
                 break;
             }
         if(!shared) arr4.push(current_stock[k])
      }
    //

    let arr5 = [...arr3,...arr4]
      console.log('arr5',arr5)

    let len = arr5.length;
    let m;
    for(m=0;m<len;m++){
      this._MenuService.updateMenu(arr5[m])  
    }

    alert('menu已经更新')
      })
    //
    

  }

   ngOnInit(): void {

      this._MenuService.getMenu()
          .then(data => {
            // console.log('data',data);
            let stocklist = data.map(item=>(item.list))
            console.log(stocklist);
            this.menuList = stocklist;
            this._StockActions.addToMenuList(this.menuList)
          }
        )

      

      }
     
   

    addToShopCar(food){
  
      this.test = this.ngRedux.getState().shopcar;
      var filterd = this.test.filter(item =>{return item.id==food.id})
      if(filterd[0]){
         this.actions.incrementNum(food);
        }else{
        this.actions.addToShopCar(food);
        // this.calSumTotal; 
      }
    }


      

}















