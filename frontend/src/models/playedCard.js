export class PlayedCard {
  constructor(card, player) {
    this.card = card;
    this.player = player;
  }
}

export function beats(one, two) {
  return one.card.compareTo(two.card);
}
