import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../models/character.model";
import {Episode} from "../../models/episode.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() data: Character | undefined = undefined;
  @Input() episodes: Episode[] | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
