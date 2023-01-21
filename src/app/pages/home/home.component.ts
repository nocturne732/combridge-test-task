import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterService} from "../../services/character.service";
import {Character} from "../../models/character.model";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  page = 0;
  characters: Character[] = [];
  hasNextPage = true;
  iconsMap = new Map<string, string>([
    ["Male", "assets/gender-male.svg"],
    ["Female", "assets/gender-female.svg"],
    ["unknown", "assets/patch-question.svg"],
    ["Genderless", "assets/x-circle.svg"]
  ]);
  destroy$: Subject<boolean> = new Subject<boolean>();

  characterGenderIcon(gender: string): string | undefined {
    return this.iconsMap.get(gender);
  }

  constructor(
    private characterService: CharacterService
  ) {
  }

  ngOnInit(): void {
    this.characterService.apiGetCharactersWithPaging(this.page).pipe(takeUntil(this.destroy$),
    ).subscribe((response) => {
        this.characters = response.results;
      }
    )
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  onScroll(): void {
    if (this.hasNextPage) {
      this.characterService.apiGetCharactersWithPaging((++this.page)).subscribe(((response) => {
            this.hasNextPage = !!response.info.next;
            this.characters.push(...response.results)
          }
        )
      )
    }
  }
}
