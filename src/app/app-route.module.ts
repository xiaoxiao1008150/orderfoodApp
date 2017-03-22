import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
// import { OrderFoodComponent } from './order-food/order-food.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/home',  pathMatch: 'full'},
  // { path:'home',component:HomeComponent },
  // { path:'detail/:id',component:OrderFoodComponent }
  // { path: 'map', loadChildren: 'app/google-map/google-map.module#GoogleMapModule' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}