import { Component, OnInit, inject, signal} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharactersService } from '../characters/services/characters-service';
import { LocationsService } from '../locations/services/locations-service';
import { EpisodesService } from '../episodes/services/episodes-service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

	private readonly charactersService = inject(CharactersService);
	private readonly locationsService = inject(LocationsService);
  private readonly episodesService = inject(EpisodesService);

	charactersCount = signal(0);
	locationsCount = signal(0);
  	episodesCount = signal(0);

	ngOnInit(): void {
		// this.characterService.getCharacterCount().subscribe(count => {
		// 	this.count = count;
		// });
		this.charactersService.getCharacterFromComponent().subscribe((response) => {
			this.charactersCount.set(response.info.count);
		});

		this.locationsService.getLocationFromComponent().subscribe((response) => {
			this.locationsCount.set(response.info.count);
		});

		this.episodesService.getEpisodeFromComponent().subscribe((response) => {
			this.episodesCount.set(response.info.count);
		});
	}
}
