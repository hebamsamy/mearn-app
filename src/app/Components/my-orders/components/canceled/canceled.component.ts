import { Component, OnInit } from '@angular/core';
import { IUserOrder } from '../../../../DataTypes/order';
import { OrderService } from '../../../../Services/order.service';

@Component({
  selector: 'app-canceled',
  templateUrl: './canceled.component.html',
  styleUrls: ['./canceled.component.css']
})
export class CanceledComponent {

  list:IUserOrder[]=[];
  constructor(
    private orderSrev:OrderService
  ) {
    this.orderSrev.GetUserOrdersList().subscribe({
      next:responce=>{
        this.list = responce.data.filter(i=>i.status==="canceled" )
        console.log(this.list);
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }

}
