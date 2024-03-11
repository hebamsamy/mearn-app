import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../Services/Api.service';
import { IProduct } from '../../DataTypes/product';
import { CartListService } from '../../Services/cart-list.service';
import { WishListService } from '../../Services/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  Id: string = '';
  product!: IProduct;
  colors: string[] = []
  constructor(
    private route: ActivatedRoute,
    private PrdApiServ: ApiService,
    private wishServ: WishListService,
    private cartServ: CartListService,
    private toastrServ: ToastrService,
    private authServ:AuthService
  ) {
    this.Id = this.route.snapshot.params["id"];
    this.PrdApiServ.GetProductByID(this.Id).subscribe({
      next: (response) => {
        this.product = response.data
        this.colors = response.data.colors![0].split(",")
      }
    })
  }
  toggle() {
    if(this.authServ.UserSubject.value == null){
      this.toastrServ.error("Sorry You Must Join Us Frist to add to your Wish list","Invalid Action")
    }else{
    if (!this.checkWishItem()) {
      // this.addtowishlist(this.product)
      this.wishServ.add(this.product).subscribe(recponse => {
        if (recponse.success) {
          this.toastrServ.success("", "Your Wish List Updated Successfully")
          this.wishServ.SetToStorage(recponse.data)
        }
        else {
          this.toastrServ.warning(recponse.message, "Sorry Something Wrong Happened")
        }
      })
    }
    else {
      this.toastrServ
        .info("Click Here To Confirm", "You Have this product in your Wisk list \n Are You sure you want to remove it from your Wishlist????", {
          closeButton: true,
        })
        .onTap.subscribe(() => {
          this.wishServ.remove(this.product._id).subscribe(res => {
            if (res.success) {
              this.toastrServ.success("", "Your Wish list Updated Successfully")
              this.wishServ.SetToStorage(res.data)
            }
            else {
              this.toastrServ.warning("", "Sorry Something Wrong Happened")
            }
          })
        });
    }}
  }
  addtocartlist(item: IProduct) {
    if(this.authServ.UserSubject.value == null){
      this.toastrServ.error("Sorry You Must Join Us Frist to add to your Shopping Cart list","Invalid Action")
    }else{
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
    }}
  }

  checkWishItem() {
    return (this.wishServ.WishSubject.value.find(item => item._id == this.product._id)) == undefined ? false : true
  }
  checkCartItem(product: IProduct) {
    return (this.cartServ.CartSubject.value.find(item => item.product == product._id)) == undefined ? false : true
  }
}
