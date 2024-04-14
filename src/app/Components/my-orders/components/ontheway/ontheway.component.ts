import { Component, OnInit } from '@angular/core';
import { IUserOrder } from '../../../../DataTypes/order';
import { OrderService } from '../../../../Services/order.service';

@Component({
  selector: 'app-ontheway',
  templateUrl: './ontheway.component.html',
  styleUrls: ['./ontheway.component.css']
})
export class OnthewayComponent {
  list:IUserOrder[]=[];
  constructor(
    private orderSrev:OrderService
  ) {
    this.orderSrev.GetUserOrdersList().subscribe({
      next:responce=>{
        this.list = responce.data.filter(i=>i.status==="ondelivery")
        console.log(this.list);
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
}
