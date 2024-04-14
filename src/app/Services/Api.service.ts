import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from '../DataTypes/apiResault';
import { IProduct } from '../DataTypes/product';
import { ILoginUser, IRegisterUser } from '../DataTypes/user';
import { ICategory } from '../DataTypes/category';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  OriginalPath = "http://localhost:5000"

  constructor(private Http: HttpClient) { }

  GetAllProducts() {
    return this.Http.get<APIResult<IProduct[]>>(this.OriginalPath + "/product")
  }
  GetAllCategories() {
    return this.Http.get<APIResult<ICategory[]>>(this.OriginalPath + "/category")
  }
  GetProductByID(id: string) {
    return this.Http.get<APIResult<IProduct>>(this.OriginalPath + "/product/" + id)
  }
  AddProduct(data: FormData) {
    return this.Http.post<APIResult<any>>(this.OriginalPath + "/product/add", data)
  }
  EditProduct(id:string,data: FormData) {
    return this.Http.put<APIResult<any>>(this.OriginalPath + "/product/edit/" + id, data)
  }
  DeleteProductByID(id: string) {
    return this.Http.delete<APIResult<any>>(this.OriginalPath + "/product/delete/" + id)
  }
  GetStoreProducts() {
    return this.Http.get<APIResult<IProduct[]>>(this.OriginalPath + "/product/store")
  }
  GetVendorProducts(id: string) {
    return this.Http.get<APIResult<any>>(this.OriginalPath + "/product/vendor/" + id)
  }


}
