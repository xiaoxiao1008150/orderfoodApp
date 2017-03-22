import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }       from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { ShopCarComponent } from './shop-car/shop-car.component';
import { StockComponent } from './stock/stock.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';

import { UserService } from './providers/user.service';
import { StockService } from './providers/stock.service';
import { MenuService } from './providers/menu.service';
//ng2 material
import { MaterialModule } from '@angular/material';
import 'hammerjs';


import { AppRoutingModule}   from './app-route.module';

import { NgReduxModule, DevToolsExtension } from '@angular-redux/store';

//redux
import { ShopCarActions } from './shop-car/shop-car.actions';
import { StockActions } from './stock/stock.actions';
import { UserActions } from './user/user.actions';
import { StockInfoActions } from './stock/stock-info.actions';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UserSearchComponent,
    ShopCarComponent,
    StockComponent,
    UserComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    NgReduxModule  
  ],
  providers: [
  UserService,
  StockService,
  MenuService,
  ShopCarActions,
  StockActions,
  UserActions,
  StockInfoActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
