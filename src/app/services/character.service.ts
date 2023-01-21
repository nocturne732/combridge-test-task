import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Character} from "../models/character.model";
import {Observable} from "rxjs";
import {Episode} from "../models/episode.model";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  apiGetCharactersWithPaging(
    page: number
  ): Observable<{
    info: {
      count: number,
      pages: number,
      next: string | null,
      prev: string | null
    },
    results: Character[] }> {
    const url = `${this.apiBaseUrl}/character/?page=${page}`;
    return this.httpClient.get<{
      info: {
        count: number,
        pages: number,
        next: string | null,
        prev: string | null
      },
      results: Character[] }>(url);
  }

  apiGetCharacterById(id: string | null): Observable<Character> {
    const url = `${this.apiBaseUrl}/character/${id}`;
    return this.httpClient.get<Character>(url);
  }

  apiGetEpisodeById(ids: string[]): Observable<Episode[]> {
    const url = `${this.apiBaseUrl}/episode/${JSON.stringify(ids)}`
    return this.httpClient.get<Episode[]>(url);
  }
}
