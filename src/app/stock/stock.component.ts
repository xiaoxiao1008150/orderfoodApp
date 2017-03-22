import { Component, OnInit } from '@angular/core';
import { StockService } from '.././providers/stock.service';
import { Observable } from 'rxjs/Observable';

import { StockActions } from './stock.actions'
import { StockInfoActions } from './stock-info.actions'

import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit{
  @select(['stockinfo']) stocks$: Observable<any[]>;

  stock:any;
  current_stock:any;
  isUpdate: Boolean=false;
  isAdd:Boolean=false;
  name:string;
  price:number;
  num:number;
  id:number;
  constructor( 
    private _StockService:StockService,
    public _StockInfoActions: StockInfoActions,
    public actions: StockActions,
    private ngRedux: NgRedux<IAppState>) { 
  }

 ngOnInit(): void {

  this._StockService.getStocks()
      .then(data => {
        // console.log(data);
        this._StockInfoActions.addToStock(data)
    })
  }

  //add current stock to menu
  addToMenu(stock){
      this.current_stock = this.ngRedux.getState().stock;
      var filterd = this.current_stock.filter(item =>{return item.id==stock.id})
      if(filterd[0]){
        console.log('you')
        alert('已经加入menu')
        }else{
        this.actions.addToMenu(stock);
      }
  }
  //add new stock


  add(): void {
    this.isAdd = true;
      // stock = stock.trim();
      // if (!stock) { return; }
      // this._StockService.create(stock)
      //   .then(stock => {
      //     this.stocks.push(stock);
      //   });
    }

  onAddSubmit(formData){
    var payload = formData.value
    this._StockInfoActions.add(payload);
    this.isAdd = false;
    
  }
  // //update
  update(stock){
    this.isUpdate = true;
    this.stock = stock;

  }

  // //delete

  delete(stock){
    this._StockInfoActions.delete(stock);
      
  }


  onSubmit(stock){
    this.isUpdate = false;
    // this._StockService.update(stock)
    //   .then(stock => {console.log(stock)});
    this._StockInfoActions.update(stock); 
  }



}















