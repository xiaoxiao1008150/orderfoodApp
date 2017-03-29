import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { NoteComponent } from './note/note.component';

export const routes: Routes = [
  { path: '', redirectTo: 'note',  pathMatch: 'full'},
  { path: 'note', component:NoteComponent},
  // { path: 'search', component:SearchComponent }

  // { path:'detail/:id',component:OrderFoodComponent }
  // { path: 'map', loadChildren: 'app/google-map/google-map.module#GoogleMapModule' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}