export class PlayedCard {
  constructor(card, player) {
    this.card = card;
    this.playerId = player.id;
    this.name = player.name;
    this.playedFromPosition = player.tablePosition;
  }
}

export function beats(one, two) {
  return one.card.compareTo(two.card);
}
