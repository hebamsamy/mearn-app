import { Component } from '@angular/core';
import { IStoredUser } from '../../DataTypes/user';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: IStoredUser | null = null;
  form: FormGroup;
  formData: FormData = new FormData();
  constructor(
    private authSrev: AuthService,
    private toasterServ: ToastrService,
    private builder: FormBuilder,
  ) {
    this.form = this.builder.group({})
    this.authSrev.UserSubject.subscribe(value => {
      this.user = value
      this.form = this.builder.group({
        name: [this.user?.name, [Validators.required, Validators.minLength(3)]],
        birthDate: [this.user?.birthDate],
        phoneNumber: [this.user?.phoneNumber, [Validators.required, Validators.minLength(11)]],
        email: [this.user?.email, [Validators.required, Validators.email]],
        gender: [this.user?.gender],
      })

    })
  }
  upload(element: any) {
    this.formData.delete("imgURL")
    this.formData.append("imgURL", element.files[0])
  }
  update() {
    for (const key in this.form.value) {
      this.formData.append(key, this.form.controls[key].value)
    }
    this.authSrev.Update(this.formData).subscribe({
      next: responce => {
        if (responce.success == true) {
          this.toasterServ.success("", responce.message)
          this.authSrev.SetToStorage({...responce.data, token:this.user?.token})
        }
        else {
          this.toasterServ.error(responce.message, "Edit Failed")
        }
      },
      error: err => {
        this.toasterServ.error(err, "Edit Failed")
      }
    })
  }
}
