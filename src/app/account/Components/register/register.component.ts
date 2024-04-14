import { Component } from '@angular/core';
import { ApiService } from '../../../Services/Api.service';
import { IRegisterUser } from '../../../DataTypes/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { authGuard } from '../../../Services/Guards/auth.guard';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
user:IRegisterUser;
form:FormGroup;
constructor(
  private AuthApiServ:AuthService,
  private router:Router,private toastrServ:ToastrService,
  private bulder:FormBuilder){
  this.user =  {
    name: '',
    password: "",
    phoneNumber:"",
    email:"",
    role:""
  }
  this.form = this.bulder.group({
    name: ["",[Validators.required,Validators.minLength(3)]],
    password: ["",[Validators.required,Validators.minLength(8)]],
    phoneNumber:["",[Validators.required,Validators.minLength(11)]],
    email:["",[Validators.required,Validators.email]],
    role:"user"
  })
}

  Send() {
    this.user = this.form.value as IRegisterUser
    this.AuthApiServ.Register(this.user).subscribe({
      next:(responce)=>{
        if (responce.success == true) {
          this.toastrServ.success(responce.message,"Register Successfully, Now Please Login")
          this.router.navigate(["/account/login",""])
        } else {
          this.toastrServ.error(responce.message,"Failed To Register")
        }
      }
    })
  }
}
