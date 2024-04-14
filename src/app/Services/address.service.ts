import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAddress } from '../DataTypes/address';
import { APIResult } from '../DataTypes/apiResault';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  OriginalPath = "http://localhost:5000/address"
  constructor(private http: HttpClient) { }
  add(address:IAddress){
    return this.http.post<APIResult<IAddress>>(this.OriginalPath+"/add",address)
  }
  edit(address:IAddress){
    return this.http.put<APIResult<any>>(this.OriginalPath+"/edit",address)
  }
  delete(id:string){
    return this.http.delete<APIResult<any>>(this.OriginalPath+"/"+id)
  }
  getAll(){
    return this.http.get<APIResult<IAddress[]>>(this.OriginalPath)
  }
  makeDefault(id:string){
    return this.http.put(`${this.OriginalPath}/make-default/${id}`,{})
  }

}
