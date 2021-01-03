import { uniqueId } from "lodash-es";

export class PlayedCard {
  constructor(card, player) {
    this.card = card;
    this.player = player;
    this.id = `${this.card.id}-${this.player.id}`;
  }
}

export function beats(one, two) {
  return one.card.compareTo(two.card);
}
