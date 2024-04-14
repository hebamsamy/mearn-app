import { Component, OnInit } from '@angular/core';
import { IUserOrder, IVendorOrder } from '../../../DataTypes/order';
import { OrderService } from '../../../Services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  list:IVendorOrder[]=[]
  constructor(
    private orderServ:OrderService
  ) { 
    this.orderServ.GetVendorOrdersList().subscribe({
      next:(res)=>{
        this.list = res.data
      }
    })
  }


}


