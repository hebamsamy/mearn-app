import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIResult } from '../DataTypes/apiResault';
import { IProduct } from '../DataTypes/product';
import { HttpClient } from '@angular/common/http';
import { ICartItem } from '../DataTypes/cart';

@Injectable()
export class CartListService {
  CartSubject: BehaviorSubject<any[]>
  OriginalPath = "http://localhost:5000"
  constructor(private http: HttpClient) { 
    this.CartSubject = new BehaviorSubject<any[]>(this.GetFromStorage())
  }
  add(item: IProduct) {
    return this.http.post<APIResult<any[]>>(this.OriginalPath + "/user/cartlist/add", item)
  }
  getAll() {
    return this.http.get<APIResult<any[]>>(this.OriginalPath + "/user/cartlist")
  }
  remove(id:string){
    return this.http.delete<APIResult<any[]>>(this.OriginalPath + "/user/cartlist/remove/"+id)
  }
  edit(id:string,qty:number){
    return this.http.put<APIResult<any[]>>(this.OriginalPath + "/user/cartlist/edit/"+id,{quantity:qty})
  }
  empty(){
    return this.http.delete<APIResult<any[]>>(this.OriginalPath + "/user/cartlist/empty")
  }
  GetFromStorage(): any[] {
   let str = localStorage.getItem("cart")
   if (str== null|| str=="") {
    return [];
   } else {
    return JSON.parse(str) as any[]
   } 
  }
  SetToStorage(data: ICartItem[]) {
    localStorage.setItem("cart", JSON.stringify(data))
    this.CartSubject.next(data)
  }
}
