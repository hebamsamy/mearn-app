import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../../../DataTypes/category';
import { ApiService } from '../../../Services/Api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Edit-Product',
  templateUrl: './Edit-Product.component.html',
  styleUrls: ['./Edit-Product.component.css']
})
export class EditProductComponent {
  ID: string = ''
  colorStr = ''
  oldImg = ''
  keepimg = true
  form: FormGroup | null = null;;
  data: FormData;
  selectImg: boolean = false;
  categories: ICategory[] = [];
  constructor(
    private builder: FormBuilder,
    private apiServ: ApiService,
    private activateRoute: ActivatedRoute) {
    this.data = new FormData()
    this.apiServ.GetAllCategories().subscribe(res => {
      this.categories = res.data
    })
    this.ID = this.activateRoute.snapshot.params["id"]
    this.call()
  }
  call() {
    this.apiServ.GetProductByID(this.ID).subscribe(responce => {
      console.log(responce.data);
      this.colorStr = responce.data.colors![0]
      this.oldImg = responce.data.imgURL
      this.form = this.builder.group({
        name: [responce.data.name, [Validators.required, Validators.minLength(3)]],
        price: [responce.data.price, [Validators.required, Validators.min(10)]],
        quantity: [responce.data.quantity, [Validators.required, Validators.min(1)]],
        colors: this.builder.array(this.colorlist),
        categoryID: [responce.data.categoryID?._id, [Validators.required]],
        description: [responce.data.description, [Validators.required, Validators.minLength(10)]],
      })
    })
  }
  get colorlist(): any[] {
    let list: any[] = []
    if (this.colorStr == undefined || this.colorStr == "") {
    }
    else {
      list = this.colorStr.split(",")
      list = list.map((value) => this.builder.control(value))
    }
    return list;
  }
  get colorArray() {
    return this.form?.controls["colors"] as FormArray
  }
  addColor() {
    this.colorArray.push(this.builder.control(""))
  }
  removeColor(ind: any) {
    this.colorArray.removeAt(ind)
  }
  chooseImage(imginput: any) {
    this.data.append("imgURL", imginput.files[0]);
    this.selectImg = true;
  }
  keepImage() {
    this.keepimg = true
    this.data.delete("imgURL")
  }
  addNewImage() {
    this.keepimg = false
  }
  send() {
    for (const key in this.form?.controls) {
      this.data.append(key, this.form.controls[key].value)
    }
    this.apiServ.EditProduct(this.ID, this.data).subscribe({
      next: (responce) => {
        console.log(responce);
        if (responce.success) {
          alert(responce.message)
          this.call()
          this.data = new FormData()
        }
        else {
          alert(responce.message)
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

