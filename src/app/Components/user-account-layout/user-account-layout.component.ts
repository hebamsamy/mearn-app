import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { IStoredUser } from '../../DataTypes/user';

@Component({
  selector: 'app-user-account-layout',
  templateUrl: './user-account-layout.component.html',
  styleUrls: ['./user-account-layout.component.css']
})
export class UserAccountLayoutComponent {
  user:IStoredUser |null= null; 
  constructor(private authSrev:AuthService) { 
    this.authSrev.UserSubject.subscribe(value=>{
      this.user = value
    })
  }

}
