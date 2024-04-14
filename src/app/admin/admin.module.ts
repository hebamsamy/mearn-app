import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { routes } from '../app.routes';
import { AddCategoryComponent } from './components/Add-Category/Add-Category.component';
import { VendorsComponent } from './components/vendors/vendors.component';

let AdminRoutes:Routes=[
  {path:"",redirectTo:"/admin/home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"users",component:UsersComponent},
  {path:"vendors",component:VendorsComponent},
  {path:"products",component:ProductsComponent},
  {path:"add-category",component:AddCategoryComponent},
]


@NgModule({
  declarations: [
    ProductsComponent,
    UsersComponent,
    HomeComponent,
    LayoutComponent,
    AddCategoryComponent,
    VendorsComponent
  ],
  imports: [
    CommonModule,
  
        FormsModule,
        RouterModule.forChild(AdminRoutes),
        HttpClientModule,
        ReactiveFormsModule
  ]
})
export class AdminModule { }
