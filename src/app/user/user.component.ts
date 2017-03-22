import { Component,OnInit,EventEmitter,Output } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { UserActions } from './user.actions';
import { IAppState } from '../../store';

import { Router }  from '@angular/router';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @select('user') users$: Observable<any[]>;
  @Output() onVoted = new EventEmitter<boolean>();

  // foods:any;
  // selectedHero: any;
  isUpdate:boolean=false;  
  current_user:string;
  isShowName:Boolean = false;
  constructor(
      // private router: Router,
      public actions: UserActions,
      private ngRedux: NgRedux<IAppState>) {}

   add(name: string): void {
      name = name.trim();
      if (!name) { alert('姓名不能为空'); return}
      this.actions.addUser(name)
    }

    update(user){
      this.actions.update(user);
 
      this.isUpdate = false;
    }
    toggleisUpdate(){
      this.isUpdate = true;
    }

    goToOrder(user){
      this.actions.goToOrder(user);
      this.current_user = user.name;
      //emit 给父组件一个布尔值
      this.onVoted.emit(false);

    }
   

}
