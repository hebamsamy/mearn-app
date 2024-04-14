import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from '../DataTypes/apiResault';
import { IUserOrder, IVendorOrder, IVendorOrderDetails } from '../DataTypes/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  OriginalPath = "http://localhost:5000/order"

  constructor(private Http: HttpClient) { }

  MakeOrder(data:any) {
    return this.Http.post<APIResult<any>>(this.OriginalPath ,data)
  }
  GetUserOrdersList() {
    return this.Http.get<APIResult<IUserOrder[]>>(this.OriginalPath+"/user")
  }
  GetUserOrder(id:string) {
    return this.Http.get<APIResult<IUserOrder>>(this.OriginalPath+"/user/"+id)
  }
  CancelOrder(id:string){
    return this.Http.delete<APIResult<any>>(this.OriginalPath + "/remove/" + id)
  }
  GetVendorOrdersList(){
    return this.Http.get<APIResult<IVendorOrder[]>>(this.OriginalPath+"/vendor")
  }
  GetVendorOrder(orderid:string){
    return this.Http.get<APIResult<IVendorOrderDetails>>(`${this.OriginalPath}/vendor/${orderid}`)
  }
  VendorChangeOrder(orderid:string, productid:string,status:string){
    return this.Http.put<APIResult<any>>(`${this.OriginalPath}/vendor-change`,{
      orderid:orderid,
      productid:productid,
      status:status
    })
  }
}
