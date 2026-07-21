import { Component, OnChanges, SimpleChanges, input, inject, signal } from '@angular/core';
import { Location } from '../../types/locations.type';
import { CharactersService } from '../../../characters/services/characters-service';
import { Character } from '../../../characters/types/character.type';

@Component({
  selector: 'app-locations-card',
  imports: [],
  templateUrl: './locations-card.html',
  styleUrl: './locations-card.css',
})
export class LocationCard implements OnChanges {
  location = input.required<Location>();
// -- Récupération des personnages au chargement
  	private characterService = inject(CharactersService);

	residents = signal<Character[]>([]);

	ngOnChanges(changes: SimpleChanges): void {   
		if (!changes['location']) {
      		return;
   		}

		const urls = this.location().residents;

		if (urls.length === 0) {
			this.residents.set([]);
			return;
		}

		const ids = urls
			.map(url => url.split('/').pop())
			.join(',');

     	this.characterService.getResidentsOfLocation(ids).subscribe(result => {

        this.residents.set(
          Array.isArray(result)
            ? result
            : [result]
        );
    });

  }
}

