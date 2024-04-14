import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/order.service';
import { ActivatedRoute } from '@angular/router';
import { IUserOrder } from '../../../../DataTypes/order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent {
  id: string = '';
  order: IUserOrder | null = null;
  Notes:string = ''
  constructor(
    private toastrServ: ToastrService,
    private orderServ: OrderService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe(val => {
      this.id = val['id'];
      this.orderServ.GetUserOrder(this.id).subscribe({
        next: (responce) => {
          if(responce.success)
            this.order = responce.data
          else
            alert(responce.message)
        }
      })

    })
  }

  isvaildtoedit():boolean{
    return this.order?.status === 'preparing' || this.order?.status === 'pending' || this.order?.status === 'ondelivery'
  }
  cancelOrder(){
    this.toastrServ
        .info("Click Here To Confirm", `Your order is ${this.order?.status}.\n Are You sure you want to CANCEL it????`, {
          closeButton: true,
        })
        .onTap.subscribe(() => {
          this.orderServ.CancelOrder(this.id).subscribe(res => {
            if (res.success) {
              this.toastrServ.success("", "Your Order Canceled Successfully")
            }
            else {
              this.toastrServ.warning("", "Sorry Something Wrong Happened")
            }
          })
        });
  }
  saveNotes(){

  }
}
