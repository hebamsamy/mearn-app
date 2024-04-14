import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateComponent } from './rate/rate.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    RateComponent
  ],
  declarations: [
    RateComponent
  ]
})
export class SharedModule { }
