import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/order.service';
import { IUserOrder } from '../../../../DataTypes/order';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent{
  list:IUserOrder[]=[];
  constructor(
    private orderSrev:OrderService
  ) {
    this.orderSrev.GetUserOrdersList().subscribe({
      next:responce=>{
        this.list = responce.data.filter(i=>i.status==="preparing" || i.status==="pending")
        console.log(this.list);
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }

}
