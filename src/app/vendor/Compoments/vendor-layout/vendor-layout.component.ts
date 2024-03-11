import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { CartListService } from '../../../Services/cart-list.service';
import { WishListService } from '../../../Services/wish-list.service';

@Component({
  selector: 'app-vendor-layout',
  templateUrl: './vendor-layout.component.html',
  styleUrl: './vendor-layout.component.css'
})
export class VendorLayoutComponent {
  constructor(
    private authServ: AuthService,
    private router: Router,
    private cartServ: CartListService,
    private wishServ: WishListService,
  ) {

  }
  logout() {
    this.authServ.UserLoggedOut()
    this.cartServ.SetToStorage([])
    this.wishServ.SetToStorage([])
    this.router.navigateByUrl("/")

  }
}
