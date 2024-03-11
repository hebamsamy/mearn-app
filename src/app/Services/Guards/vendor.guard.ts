// import { CanActivateFn } from '@angular/router';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn:"root"
})
export class VendorGuard implements CanActivate {
  constructor(private authServ: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let userdata = this.authServ.GetFromStorage()
    
    if (userdata == null || userdata.role != "vendor" ) {
      alert("Sorry you Must be Vendor (Seller) :)")
      this.router.navigate(["/account/login",state.url])
      return false;
    }
    else{
      return true;
    }


  }

}