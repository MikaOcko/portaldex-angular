import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from '../types/locations.type';
import { Character } from '../../characters/types/character.type';
import { ApiResponse } from '../../../shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})

export class LocationsService {
	private readonly http = inject(HttpClient);
	private locations = signal<Location[]>([]);
	readonly locationSignal = this.locations.asReadonly();
	readonly url = 'https://rickandmortyapi.com/api/location';

    getLocationsFromService(page: number = 1): Observable<ApiResponse<Location[]>> {
      return this.http
        .get<ApiResponse<Location[]>>(this.url, {
          params: { page: page },
        })
        .pipe(tap((response: ApiResponse<Location[]>) => this.locations.set(response.results)));
    }

    getLocationFromComponent(page: number = 1): Observable<ApiResponse<Location[]>> {
      return this.http.get<ApiResponse<Location[]>>(this.url, {
        params: { page: page },
      });
    }
}
