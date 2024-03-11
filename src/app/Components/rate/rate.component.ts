import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.css'
})
export class RateComponent {
  @Input() value: number = 1
  @Input() count: number = 1
}
