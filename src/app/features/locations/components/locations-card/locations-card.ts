import { Component, input } from '@angular/core';
import { Location } from '../../types/locations.type';

@Component({
  selector: 'app-locations-card',
  imports: [],
  templateUrl: './locations-card.html',
  styleUrl: './locations-card.css',
})
export class LocationCard {
  location = input.required<Location>();
}
