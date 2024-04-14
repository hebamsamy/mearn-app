import { Component } from '@angular/core';
import { IVendorOrderDetails } from '../../../DataTypes/order';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../Services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  orderid: string = '';
  order: IVendorOrderDetails | null = null;
  Notes: string = ''
  constructor(
    private toastrServ: ToastrService,
    private orderServ: OrderService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe(val => {
      this.orderid = val['id'];
      this.get()
    })
  }
  get() {
    this.orderServ.GetVendorOrder(this.orderid).subscribe({
      next: (responce) => {
        console.log(responce);

        if (responce.success)
          this.order = responce.data
        else
          alert(responce.message)
      }
    })
  }
  isvaildtoedit(): boolean {
    return this.order?.status === 'preparing' || this.order?.status === 'pending' || this.order?.status === 'ondelivery'
  }
  changeStatus(productid: string,status:string) {
    this.toastrServ
      .info("Click Here To Confirm", `Are You sure you want to confirm it and prepare this Prooduct ?`, {
        closeButton: true,
      })
      .onTap.subscribe(() => {
        this.orderServ.VendorChangeOrder(this.orderid, productid,status).subscribe(res => {
          if (res.success) {
            this.toastrServ.success("", "Confirmed Successfully")
            this.get()
          }
          else {
            this.toastrServ.warning("", "Sorry Something Wrong Happened")
          }
        })
      });
  }
  mytotal():number{
    let total = 0;
    for (let index = 0; index < this.order!.productlist.length; index++) {
      total += this.order!.productlist[index].supPrice;
    }
    return total;
  }
  saveNotes() {

  }

}
