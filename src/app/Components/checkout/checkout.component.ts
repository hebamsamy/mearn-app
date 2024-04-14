import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../DataTypes/cart';
import { CartListService } from '../../Services/cart-list.service';
import { ApiService } from '../../Services/Api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { IStoredUser } from '../../DataTypes/user';
import { IAddress } from '../../DataTypes/address';
import { AddressService } from '../../Services/address.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../Services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  list: ICartItem[] = []

  deliveryInstructions: string = "";
  paymentMethod: string = "cash";
  address: string = "";

  addAddressForm: FormGroup;
  currentUser: IStoredUser | null = null;
  currentAddresses: IAddress[] = [];
  constructor(
    private cartServ: CartListService,
    private apiServ: ApiService,
    private formBuilder: FormBuilder,
    private authServ: AuthService,
    private addressServ: AddressService,
    private toastrServ: ToastrService,
    private orderServ:OrderService,
    private router: Router
  ) {
    this.authServ.UserSubject.subscribe(data => {
      this.currentUser = data
    })
    this.addAddressForm = this.formBuilder.group({
      city: ["", Validators.required],
      address1: ["", Validators.required],
      address2: ["", Validators.required],
      markland: ["", Validators.required],
      zip: ["", Validators.required],
      phoneNumber: ["", Validators.required],
    })
    this.call()
    this.getAllAddresses(true)
  }
  getAllAddresses(setDefault: boolean) {
    this.addressServ.getAll().subscribe(responce => {
      this.currentAddresses = responce.data
      if (setDefault) {
        this.address = this.currentAddresses.find(item => item.isDefault == true)?._id ?? ""
      }
    })
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
  payCash(cash: any) {
    this.paymentMethod = cash.checked ? 'cash' : 'creditcard'
    console.log(this.paymentMethod);
  }
  payCreditCard(creditcard: any) {
    this.paymentMethod = creditcard.checked ? 'creditcard' : 'cash'
    console.log(this.paymentMethod);
  }
  payPaypal(paypal: any) {
    this.paymentMethod = paypal.checked ? 'paypal' : 'cash'
    console.log(this.paymentMethod);
  }
  saveAddress() {
    console.log(this.addAddressForm.value);
    this.addressServ.add(this.addAddressForm.value as IAddress).subscribe({
      next: (responce) => {
        this.toastrServ.success(responce.message, "Adding Address")
        this.getAllAddresses(false)
        this.address = responce.data._id
      },
      error: (err) => {
        console.log(err);
        this.toastrServ.error("Error Happend while Adding", "Adding Address")
      }
    })
  }
  chooseAddress(id: string) {
    this.address = id
  }
  makeOrder() {
    console.log(this.address);
    console.log(this.paymentMethod);
    console.log(this.deliveryInstructions);
    let data = {
      paymentMethod: this.paymentMethod,
      deliveryInstructions: this.deliveryInstructions,
      address: this.address
    }
    this.orderServ.MakeOrder(data).subscribe({
      next:(responce)=>{
        console.log(responce);
        
        if(responce.success){
          this.toastrServ.success("","Successfully Make Order")
          this.router.navigateByUrl("/order-completed")
        }
        else{
          this.toastrServ.error("Try Again Later","Faild to Make Order")
        this.router.navigateByUrl("/order-canceled")
        }

      },
      error:(err)=>{
        this.toastrServ.error("Try Again Later","Faild to Make Order")
        this.router.navigateByUrl("/order-canceled")

      },
    })
    this.cartServ.SetToStorage([]);
  }
}
