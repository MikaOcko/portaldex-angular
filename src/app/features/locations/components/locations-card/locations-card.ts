import { Component, input, inject } from '@angular/core';
import { Location } from '../../types/locations.type';
import { LocationsService } from '../../services/locations-service';
import { Character } from '../../../characters/types/character.type';

@Component({
  selector: 'app-locations-card',
  imports: [],
  templateUrl: './locations-card.html',
  styleUrl: './locations-card.css',
})
export class LocationCard {
  location = input.required<Location>();
// -- Récupération des personnages au chargement (assisté par IA)
  	private locationService = inject(LocationsService);

	residents: Character[] = [];

	ngOnInit() {

		const ids = this.location()
		.residents
		.map(url => url.split('/').pop())
		.join(',');

		if (!ids) return;

		this.locationService
		.getResidents(ids)
		.subscribe(residents => {
			this.residents = Array.isArray(residents)
			? residents
			: [residents];
		});
  	}
}

