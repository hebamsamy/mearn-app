import { Component, OnInit } from '@angular/core';
import { CartListService } from '../../Services/cart-list.service';
import { ICartItem } from '../../DataTypes/cart';
import { ApiService } from '../../Services/Api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css']
})
export class CartlistComponent {
  list: ICartItem[] = []
  constructor(
    private cartServ: CartListService,
    private apiServ: ApiService,
    private toastrServ: ToastrService
  ) {
    this.call()
  }
  call() {
    this.list = []
    this.cartServ.getAll().subscribe(responce => {
      responce.data.forEach((element => {
        this.apiServ.GetProductByID(element.product).subscribe(responce => {
          this.list.push(
            {
              _id: element._id,
              quantity: element.quantity,
              product: responce.data
            }
          )
        })
      }))
      this.cartServ.SetToStorage(responce.data)
    })
  }
  calcTotal() {
    let total = 0;
    this.list.forEach((element) => {
      total += element.quantity * element.product.price
    })
    return total
  }
  removeFromCart(id: string) {
    this.toastrServ
      .info("Click Here To Confirm", "Are You sure you want to remove it from your Cart list????", {
        closeButton: true,
      })
      .onTap.subscribe(() => {
        this.cartServ.remove(id).subscribe(res => {
          if (res.success) {
            this.toastrServ.success("", "Your Cart list Updated Successfully")
            this.call()
          }
          else {
            this.toastrServ.warning("", "Sorry Something Wrong Happened")
          }
        })
      });
  }
  edit(cartId: string, qty: string, limit: number) {
    let num = parseInt(qty)
    if (Number.isNaN(num)) {
      this.toastrServ.warning("You Have to enter a valid number","Sorry")
    }
    else if (num < 1) {
      this.toastrServ.warning("You Have to enter a valid number more than 0 of course","Sorry")
    }
    else if (num > limit) {
      this.toastrServ.warning("The Vaild Quantity for this Product is " + limit,"Sorry")
    }
    else {
      this.cartServ.edit(cartId, Number(qty)).subscribe(responce => {
        if (responce.success) {
          this.toastrServ.success("", "Your Cart List Updated Successfully")
          this.call()
        }
        else {
          this.toastrServ.warning(responce.message, "Sorry Something Wrong Happened")
        }
      })
    }
  }
  empty() {
    this.toastrServ
      .info("Click Here To Confirm", "Are You sure you want to remove All your shopping Cart Items ???", {
        closeButton: true,
      })
      .onTap.subscribe(() => {
        this.cartServ.empty().subscribe(res => {
          if (res.success) {
            this.toastrServ.success("", "Your cart list cleared Successfully")
            this.call()
          }
          else {
            this.toastrServ.warning("", "Sorry Something Wrong Happened")
          }
        })
      });
  }
}
