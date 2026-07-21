import { Component, OnInit, signal, inject } from '@angular/core';
import { LocationCard } from '../../components/locations-card/locations-card';
import { Pagination } from '../../components/pagination/pagination';
import { LocationsService } from '../../services/locations-service';
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types';
import { Location } from '../../types/locations.type';


@Component({
  selector: 'app-locations',
  imports: [LocationCard, Pagination],
  templateUrl: './locations.html',
  styleUrl: './locations.css',
})
export class Locations {
  private readonly locationService = inject(LocationsService);
	readonly locations = this.locationService.locationSignal;
	readonly infos = signal<InfoResponse>({} as InfoResponse);
	currentPage = signal(1);
	totalPage = signal(0);
  
	ngOnInit() {
	  // Method 1 : Do everything in the service
	  this.locationService.getLocationsFromService().subscribe();
	  // Method 2 : Get needed value in the component directly
	  this.loadLocations();
	}
  
	loadLocations(page?: number) {
	  this.currentPage.set(page ? page : 1);
  
	  this.locationService
		.getLocationFromComponent()
		.subscribe((response: ApiResponse<Location[]>) => {
		  this.infos.set(response.info);
		  this.totalPage.set(this.infos().pages);
		});
	}
  
	changePage(page: number) {
	  this.currentPage.set(page);
	  this.locationService.getLocationsFromService(page).subscribe();
	}
}
