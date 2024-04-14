import { Component, OnInit } from '@angular/core';
import { IUserOrder } from '../../../../DataTypes/order';
import { OrderService } from '../../../../Services/order.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent  {

  list:IUserOrder[]=[];
  constructor(
    private orderSrev:OrderService
  ) {
    this.orderSrev.GetUserOrdersList().subscribe({
      next:responce=>{
        this.list = responce.data.filter(i=>i.status==="completed")
        console.log(this.list);
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
}
