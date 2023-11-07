import { Component } from '@angular/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  dataSource= ELEMENT_DATA;
  image: any;
}
export interface Element {
  name: string;
  imageUrl: string;
}

const ELEMENT_DATA: Element[] = [
  {name: '1', imageUrl: 'https://www.foodnetwork.com/content/dam/images/food/video/1/11/117/1176/11763609.jpg'},
  {name: '2', imageUrl: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/69561926/DSC03616.16.jpg'},
  {name: '3', imageUrl: 'https://s.hdnux.com/photos/01/31/13/12/23376574/3/1200x0.jpg'},
];
