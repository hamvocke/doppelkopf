import { uniqueId } from "lodash-es";
import { Card } from "@/models/card";
import { Player } from "./player";

// TODO: replace with type declaration, drop ID?
export class PlayedCard {
  card: Card;
  player: Player;
  id: string;

  constructor(card: Card, player: any) {
    this.card = card;
    this.player = player;
    this.id = `${this.card.id}-${this.player.id}`;
  }
}
