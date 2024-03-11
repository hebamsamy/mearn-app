import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from '../DataTypes/apiResault';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  OriginalPath = "http://localhost:5000/order"

  constructor(private Http: HttpClient) { }

  GetAllProducts() {
    return this.Http.post<APIResult<any>>(this.OriginalPath + "/",{
      paymentMethod :"cash"
    })
  }

}
