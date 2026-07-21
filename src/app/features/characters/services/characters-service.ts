import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { Character } from '../types/character.type';
import { ApiResponse } from '../../../shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly http = inject(HttpClient);
  private characters = signal<Character[]>([]);
  readonly characterSignal = this.characters.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/character/';

  getCharactersFromService(page: number = 1): Observable<ApiResponse<Character[]>> {
    return this.http
      .get<ApiResponse<Character[]>>(this.url, {
        params: { page: page },
      })
      .pipe(tap((response: ApiResponse<Character[]>) => this.characters.set(response.results)));
  }

  getCharacterFromComponent(page: number = 1): Observable<ApiResponse<Character[]>> {
    return this.http.get<ApiResponse<Character[]>>(this.url, {
      params: { page: page },
    });
  }


    getResidentsOfLocation(ids: string): Observable<Character | Character[]> {
    return this.http.get<Character | Character[]>(
      `https://rickandmortyapi.com/api/character/${ids}`
    );
  }

  	// Récupérer le nombre de la propriété "count" dans la partie info du retour de l'API
	getCharacterCount(): Observable<number> {
		return this.http.get<ApiResponse<Character[]>>(this.url).pipe(
			map(response => response.info.count)
		);
	}

}
