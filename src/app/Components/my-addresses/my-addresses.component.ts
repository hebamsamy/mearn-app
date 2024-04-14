import { Component, OnInit } from '@angular/core';
import { IAddress } from '../../DataTypes/address';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from '../../Services/address.service';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.css']
})
export class MyAddressesComponent {
  currentAddresses:IAddress[] = [];
  addAddressForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrServ: ToastrService,
    private addressServ: AddressService,
  ) { 
    this.getAllAddresses();
    this.addAddressForm = this.formBuilder.group({
      city: ["", Validators.required],
      address1: ["", Validators.required],
      address2: ["", Validators.required],
      markland: ["", Validators.required],
      zip: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      _id:[null],
      isDefault:[false],
    })
  }

  MakeDefaultAddress(id:string){
    this.addressServ.makeDefault(id).subscribe(
      {
        next:(res)=>{
          this.getAllAddresses()
        },
        error:(err)=>{

        }
      }
    )
  }

  saveAddress() {
    console.log(this.addAddressForm.value);
    if(this.addAddressForm.controls["_id"].value == null){
      this.addressServ.add(this.addAddressForm.value as IAddress).subscribe({
        next: (responce) => {
          this.toastrServ.success(responce.message, "Adding Address")
          this.getAllAddresses()
        },
        error: (err) => {
          console.log(err);
          this.toastrServ.error("Error Happend while Adding", "Adding Address")
        }
      })
    }
    else{
      this.addressServ.edit(this.addAddressForm.value as IAddress).subscribe({
        next: (responce) => {
          this.toastrServ.success(responce.message, "Editing Address")
          this.getAllAddresses()
        },
        error: (err) => {
          console.log(err);
          this.toastrServ.error("Error Happend while Editing", "Editing Address")
        }
      })
    }
    this.addAddressForm.reset()
  }

  getAllAddresses() {
    this.addressServ.getAll().subscribe(responce => {
      this.currentAddresses = responce.data 
      console.log(this.currentAddresses);
      
    })
  }

  edit(item :IAddress){
    this.addAddressForm = this.formBuilder.group({
      city: [item.city, Validators.required],
      address1: [item.address1, Validators.required],
      address2: [item.address2, Validators.required],
      markland: [item.markland, Validators.required],
      zip: [item.zip, Validators.required],
      phoneNumber: [item.phoneNumber, Validators.required],
      _id:[item._id],
      isDefault:[item.isDefault],
    })
  }

  delete(id:string){
    this.addressServ.delete(id).subscribe({
      next: (responce) => {
        this.toastrServ.success(responce.message, "Deleting Address")
        this.getAllAddresses()
      },
      error: (err) => {
        console.log(err);
        this.toastrServ.error("Error Happend while Editing", "Deleting Address")
      }
    })
  }
}
