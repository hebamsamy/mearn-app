import { Component } from '@angular/core';
import { IProduct } from '../../DataTypes/product';
import { CartListService } from '../../Services/cart-list.service';
import { WishListService } from '../../Services/wish-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  list: IProduct[] = []
  constructor(
    private wishServ: WishListService,
    private cartServ: CartListService,
    private toastrServ: ToastrService
  ) {
    this.get()
  }

  get() {
    this.wishServ.getAll().subscribe(res => {
      this.list = res.data
      this.wishServ.SetToStorage(this.list)
    })
  }
  addtocartlist(item: IProduct) {
    if (!this.checkCartItem(item)) {
      this.cartServ.add(item).subscribe(recponse => {
        if (recponse.success) {
          this.toastrServ.success("", "Your Cart List Updated Successfully")
          this.cartServ.SetToStorage(recponse.data)
        }
        else {
          this.toastrServ.warning(recponse.message, "Sorry Something Wrong Happened")
        }
      })
    }
    else {
      let delItem:any = this.cartServ.CartSubject.value.find(cartItem => cartItem.product == item._id)      
      this.toastrServ
        .info("Click Here To Confirm", "You Have this product in your Cart list \n Are You sure you want to remove it from your Cartlist????", {
          closeButton: true,
        })
        .onTap.subscribe(() => {
          this.cartServ.remove(delItem._id).subscribe(res => {
            if (res.success) {
              this.toastrServ.success("", "Your Cart list Updated Successfully")
              this.cartServ.SetToStorage(res.data)
            }
            else {
              this.toastrServ.warning("", "Sorry Something Wrong Happened")
            }
          })
        });
    }
  }

  RemoveFromwishlist(item: IProduct) {
    this.toastrServ
      .info("Click Here To Confirm", "Are You sure you want to remove All your Wish List Items ???", {
        closeButton: true,
      })
      .onTap.subscribe(() => {
        this.wishServ.remove(item._id).subscribe(res => {
          if (res.success) {
            this.toastrServ.success("", "Your Wish list Updated Successfully")
            this.get()
          }
          else {
            this.toastrServ.warning("", "Sorry Something Wrong Happened")
          }
        })
      });
  }
  empty() {
    this.toastrServ
      .info("Click Here To Confirm", "Are You sure you want to remove All Your Wish List Items ???", {
        closeButton: true,
      })
      .onTap.subscribe(() => {
        this.wishServ.empty().subscribe(res => {
          if (res.success) {
            this.toastrServ.success("", "Your Wish list cleared Successfully")
            this.get()
          }
          else {
            this.toastrServ.warning("", "Sorry Something Wrong Happened")
          }
        })
      });
  }
  checkCartItem(product: IProduct) {    
    return (this.cartServ.CartSubject.value.find(item => item.product == product._id)) == undefined ? false : true
  }
}
