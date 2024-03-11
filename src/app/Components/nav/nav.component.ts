import { Component } from '@angular/core';
import { ProductListService } from '../../Services/product-list.service';
import { CartListService } from '../../Services/cart-list.service';
import { IStoredUser } from '../../DataTypes/user';
import { AuthService } from '../../Services/auth.service';
import { WishListService } from '../../Services/wish-list.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  clientName: string = ""
  wish = 0
  cart = 0
  LoggedUser: IStoredUser | null = null
  constructor(
    private authServ: AuthService,
    private cartServ: CartListService,
    private wishServ: WishListService,
    private toastrServ:ToastrService,
    private router:Router
    ) {
    this.cartServ.CartSubject.subscribe((value) => {
      this.cart = value.length
    })
    this.wishServ.WishSubject.subscribe((value) => {
      this.wish = value.length
    })
    this.authServ.UserSubject.subscribe(data => {
      this.LoggedUser = data
    })

  }
  logOut() {
    this.authServ.UserLoggedOut()
    this.cartServ.SetToStorage([])
    this.wishServ.SetToStorage([])
    this.router.navigateByUrl("/")
    this.toastrServ.success("Please Visit Us Soon!!","Logout Successfully")
  }



}



