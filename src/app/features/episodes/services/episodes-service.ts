import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Episode } from '../types/episodes.type';
import { ApiResponse } from '../../../shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})

export class EpisodesService {
  private readonly http = inject(HttpClient);
  private episodes = signal<Episode[]>([]);
  readonly episodeSignal = this.episodes.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/episode/';

    getEpisodesFromService(page: number = 1): Observable<ApiResponse<Episode[]>> {
      return this.http
        .get<ApiResponse<Episode[]>>(this.url, {
          params: { page: page },
        })
        .pipe(tap((response: ApiResponse<Episode[]>) => this.episodes.set(response.results)));
    }

    getEpisodeFromComponent(page: number = 1): Observable<ApiResponse<Episode[]>> {
      return this.http.get<ApiResponse<Episode[]>>(this.url, {
        params: { page: page },
      });
    }
}
