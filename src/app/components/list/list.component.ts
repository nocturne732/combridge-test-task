import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../models/character.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() data: Character[] | undefined = undefined;
  iconsMap = new Map<string, string>([
    ["Male", "assets/gender-male.svg"],
    ["Female", "assets/gender-female.svg"],
    ["unknown", "assets/patch-question.svg"],
    ["Genderless", "assets/x-circle.svg"]
  ]);
  constructor() { }

  ngOnInit(): void {
  }

  characterGenderIcon(gender: string): string | undefined {
    return this.iconsMap.get(gender);
  }

}
