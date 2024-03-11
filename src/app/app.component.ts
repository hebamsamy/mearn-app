import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './DataTypes/product';
import { ProductListService } from './Services/product-list.service';
import { MoneyPipe } from './pipes/money.pipe';
import { LoaderService } from './Services/loader.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  

})
export class AppComponent {
  title = 'mearn-app';
  toLoad: BehaviorSubject<boolean>;
  constructor(private loaderServ:LoaderService){
    this.toLoad=  this.loaderServ.isLoaded
  }


}
