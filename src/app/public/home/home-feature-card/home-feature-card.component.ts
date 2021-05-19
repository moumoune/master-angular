import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'al-home-feature-card',
  templateUrl: './home-feature-card.component.html',
  styles: [
  ]
})
export class HomeFeatureCardComponent implements OnInit {

  @Input() description: string = '';
  @Input() icon: string = '';
  @Input() title: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
