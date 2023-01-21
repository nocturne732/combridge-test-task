import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterService} from "../../services/character.service";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {Character} from "../../models/character.model";
import {concat, concatMap, map, Observable, Subject, takeUntil, tap} from "rxjs";
import {Episode} from "../../models/episode.model";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {

  character: Character | undefined = undefined;
  episodes: Episode[] | undefined = undefined;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private characterService: CharacterService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get(('id'));
    this.characterService.apiGetCharacterById(id)
      .pipe(
        takeUntil(this.destroy$),
        tap(response => {
            this.character = response;
          }
        ),
        concatMap((response) => {
          const ids = response.episode.map((value) => {
            const temp = value.split("/");
            return temp[temp.length - 1];
          })
          return this.characterService.apiGetEpisodeById(ids).pipe(tap((response) => this.episodes = response));
        })
      ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
