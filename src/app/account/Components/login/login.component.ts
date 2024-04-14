import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILoginUser, IStoredUser } from '../../../DataTypes/user';
import { ApiService } from '../../../Services/Api.service';
import { AuthService } from '../../../Services/auth.service';
import { CartListService } from '../../../Services/cart-list.service';
import { WishListService } from '../../../Services/wish-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: ILoginUser;
  returnURL = "/home";
  form :FormGroup;
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private authServ: AuthService,
    private cartServ: CartListService,
    private wishServ: WishListService,
    private activateServ: ActivatedRoute,
    private toastrServ:ToastrService
    ) {
    this.user = { email: "", password: '' }
    this.form = this.builder.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.minLength(8)]]
    })
    this.returnURL = this.activateServ.snapshot.params["returnURL"]
  }
  Send() {
    this.user = this.form.value as ILoginUser;    
    this.authServ.Login(this.user).subscribe({
      next: (responce) => {
        if (responce.success) {
          this.toastrServ.success(responce.message,"Login Successfully")
          let data: IStoredUser = {
            token: responce.data.token,
            name: responce.data.user.name,
            email: responce.data.user.email,
            phoneNumber: responce.data.user.phoneNumber,
            role: responce.data.user.role,
            _id: responce.data.user._id,
            gender:responce.data.user.gender,
            birthDate:responce.data.user.birthDate,
            imgURL:responce.data.user.imgURL
          }
          this.authServ.newUserLoggedIn(data)
          this.call()
          if (data.role == "vendor") {
            this.router.navigateByUrl("/vendor/home")
          }
          else {
            this.router.navigateByUrl(this.returnURL)
          }
        } else {
          this.toastrServ.error(responce.message,"Failed To Login")
          
        }
      }
    })
  }
  call() {
    this.cartServ.getAll().subscribe(responce => {
      this.cartServ.SetToStorage(responce.data)
    })
    this.wishServ.getAll().subscribe(responce => {
      this.wishServ.SetToStorage(responce.data)
    })
  }

}
