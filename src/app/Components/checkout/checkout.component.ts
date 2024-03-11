import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../DataTypes/cart';
import { CartListService } from '../../Services/cart-list.service';
import { ApiService } from '../../Services/Api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Address, IStoredUser } from '../../DataTypes/user';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  list: ICartItem[] = []
  DeliveryInstructions:string = ""
  paymentMethod: string = "cash"
  addAddressForm : FormGroup;
  currentUser:IStoredUser|null=null;
  currentAddress:Address|null=null
  constructor(
    private cartServ: CartListService,
    private apiServ: ApiService,
    private formBuilder:FormBuilder,
    private authServ:AuthService
  ) {
    this.authServ.UserSubject.subscribe(data=>{
      this.currentUser = data
    })
    this.addAddressForm = this.formBuilder.group({
      country :["",Validators.required],
      address1 :["",Validators.required],
      address2 :["",Validators.required],
      markland :["",Validators.required],
      zip :["",Validators.required],
      phone :["",Validators.required],
  })
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
  saveAddress(){
    console.log(this.addAddressForm.value);
  }
}
