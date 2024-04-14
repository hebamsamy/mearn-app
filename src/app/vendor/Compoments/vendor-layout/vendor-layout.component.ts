import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { CartListService } from '../../../Services/cart-list.service';
import { WishListService } from '../../../Services/wish-list.service';
import { IStoredUser } from '../../../DataTypes/user';

@Component({
  selector: 'app-vendor-layout',
  templateUrl: './vendor-layout.component.html',
  styleUrl: './vendor-layout.component.css'
})
export class VendorLayoutComponent {
  user:IStoredUser|null= null
  constructor(
    private authServ: AuthService,
    private router: Router,
    private cartServ: CartListService,
    private wishServ: WishListService,
  ) {
    this.authServ.UserSubject.subscribe(value=>{
      this.user = value;
    })
  }
  logout() {
    this.authServ.UserLoggedOut()
    this.cartServ.SetToStorage([])
    this.wishServ.SetToStorage([])
    this.router.navigateByUrl("/")

  }
}
