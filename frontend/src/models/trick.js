import { uniqueId } from "lodash-es";
import { PlayedCard, beats } from "@/models/playedCard";
import { ranks, suits } from "@/models/card";
import { DOPPELKOPF, FOX } from "@/models/extras";

export class Trick {
  constructor(expectedNumberOfCards) {
    this.expectedNumberOfCards = expectedNumberOfCards;
    this.playedCards = [];
    this.finished = false;
    this.id = uniqueId("trick_");
  }

  add(card, player) {
    if (this.cardBy(player)) {
      throw Error(`Player ${player.name} already played a card`);
    }

    const playedCard = new PlayedCard(card, player);

    this.playedCards.push(playedCard);

    if (this.playedCards.length === this.expectedNumberOfCards) {
      this.finished = true;
    }
  }

  cards() {
    return this.playedCards;
  }

  cardBy(player) {
    return this.playedCards.filter(
      playedCard => playedCard.player.id === player.id
    )[0];
  }

  isFinished() {
    return this.finished;
  }

  baseCard() {
    if (!this.playedCards[0]) {
      return undefined;
    }

    return this.playedCards[0].card;
  }

  winner() {
    if (!this.playedCards[0]) {
      return undefined;
    }

    let highestCard = this.playedCards[0];
    for (let card of this.playedCards) {
      if (beats(card, highestCard) < 0) {
        highestCard = card;
      }
    }

    return highestCard.player;
  }

  points() {
    return this.playedCards.reduce(
      (acc, playedCard) => acc + playedCard.card.value,
      0
    );
  }

  extras() {
    let extras = [];
    if (this.points() >= 40) {
      extras.push(DOPPELKOPF);
    }

    var fox = this.findFox();
    if (fox) {
      const caughtByOtherParty =
        (fox.player.isRe() && !this.winner().isRe()) ||
        (fox.player.isKontra() && !this.winner().isKontra());
      if (caughtByOtherParty) extras.push(FOX);
    }

    return extras;
  }

  findFox() {
    return this.playedCards.filter(
      playedCard =>
        playedCard.card.rank === ranks.ace &&
        playedCard.card.suit === suits.diamonds
    )[0];
  }
}
