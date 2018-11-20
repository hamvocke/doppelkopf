export class PlayedCard {
  constructor(card, player) {
    this.card = card;
    this.playerId = player.id;
    this.name = player.name;
  }
}

export function beats(one, two) {
  return one.card.compareTo(two.card);
}
