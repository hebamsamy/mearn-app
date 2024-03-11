import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIResult } from '../DataTypes/apiResault';
import { IProduct } from '../DataTypes/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn:'root'
})
export class WishListService {
  WishSubject: BehaviorSubject<IProduct[]>
  OriginalPath = "http://localhost:5000"
  constructor(private http: HttpClient) { 
    this.WishSubject = new BehaviorSubject<any[]>(this.GetFromStorage())
  }
  add(item: IProduct) {
    return this.http.post<APIResult<any>>(this.OriginalPath + "/user/wishlist/add", item)
  }
  getAll() {
    return this.http.get<APIResult<IProduct[]>>(this.OriginalPath + "/user/wishlist")
  }
  remove(id:string){
    return this.http.delete<APIResult<any>>(this.OriginalPath + "/user/wishlist/remove/"+id)
  }
  empty(){
    return this.http.delete<APIResult<any[]>>(this.OriginalPath + "/user/wishlist/empty")
  }
  GetFromStorage(): any[] {
   let str = localStorage.getItem("Wish")
   if (str== null|| str=="") {
    return [];
   } else {
    return JSON.parse(str) as any[]
   } 
  }
  SetToStorage(data: IProduct[]) {
    localStorage.setItem("Wish", JSON.stringify(data))
    this.WishSubject.next(data)
  }
}
