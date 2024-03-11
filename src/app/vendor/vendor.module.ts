import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Compoments/add-product/add-product.component';
import { EditProductComponent } from './Compoments/Edit-Product/Edit-Product.component';
import { ProductsComponent } from './Compoments/products/products.component';
import { HomeComponent } from './Compoments/home/home.component';
import { VendorLayoutComponent } from './Compoments/vendor-layout/vendor-layout.component';
import { ProfileComponent } from './Compoments/profile/profile.component';

let VendorRoutes:Routes=[
  {path:"",redirectTo:"/vendor/home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"profile",component:ProfileComponent},
  {path:"products",component: ProductsComponent},
  {path:"add-product",component: AddProductComponent},
  {path:"edit-product/:id",component: EditProductComponent}
]

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    VendorLayoutComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
        RouterModule.forChild(VendorRoutes),
        HttpClientModule,
        ReactiveFormsModule
  ]
})
export class VendorModule { }
