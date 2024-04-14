import { Component } from '@angular/core';
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
