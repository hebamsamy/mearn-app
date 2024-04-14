import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILoginUser, IRegisterUser, IStoredUser } from '../DataTypes/user';
import { HttpClient } from '@angular/common/http';
import { APIResult } from '../DataTypes/apiResault';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  UserSubject: BehaviorSubject<IStoredUser|null>


  OriginalPath = "http://localhost:5000"
  constructor(private http: HttpClient) { 
    this.UserSubject = new BehaviorSubject<IStoredUser|null>(this.GetFromStorage())
  }
  Register(User: IRegisterUser) {
    return this.http.post<APIResult<any>>(this.OriginalPath + "/user/register", User)
  }

  Login(User: ILoginUser) {
    return this.http.post<APIResult<any>>(this.OriginalPath + "/user/login", User)
  }
  Update(data:FormData){
    return this.http.put<APIResult<any>>(this.OriginalPath + "/user/update",data)
  }
  GetFromStorage(): IStoredUser|null {
   let str = localStorage.getItem("user")
   if (str== null|| str=="") {
    return null;
   } else {
    return JSON.parse(str) as IStoredUser
   } 
  }
  SetToStorage(data: IStoredUser) {
    localStorage.setItem("user", JSON.stringify(data))
  }
  newUserLoggedIn(data:IStoredUser) {
    this.SetToStorage(data)
    this.UserSubject.next(data)
  }
  UserLoggedOut() {
    localStorage.removeItem("user",)
    this.UserSubject.next(null)
  }

}
