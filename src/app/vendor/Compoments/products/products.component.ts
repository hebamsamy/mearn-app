import { Component } from '@angular/core';
import { IProduct, Product } from '../../../DataTypes/product';
import { ProductListService } from '../../../Services/product-list.service';
import { CartListService } from '../../../Services/cart-list.service';
import { ApiService } from '../../../Services/Api.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  list:IProduct[]=[];

  constructor(private apiServ:ApiService){
    this.call()
  }
  call(){
    this.apiServ.GetStoreProducts().subscribe((responce)=>{
      this.list = responce.data
    })
  }
  delete(id:string){
    if(confirm("Are you sure you want to delete this product ???")){
      this.apiServ.DeleteProductByID(id).subscribe((responce)=>{
        alert("Deleted Successfully")
        this.call()
      })
    }
  }
}
