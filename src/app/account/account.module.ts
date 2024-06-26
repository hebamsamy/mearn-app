import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../Components/profile/profile.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from '../Components/user-layout/user-layout.component';

let accountRoutes:Routes=[
  {path:"login/:returnURL",component: LoginComponent},
  {path:"register",component: RegisterComponent},
]


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
        FormsModule,
        RouterModule.forChild(accountRoutes),
        HttpClientModule,
        ReactiveFormsModule
  ]
})
export class AccountModule { }
