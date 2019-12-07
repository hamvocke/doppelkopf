import { find, uniqueId } from "lodash-es";
import { PlayedCard, beats } from "@/models/playedCard";
import { Notifier } from "@/models/notifier";
import { DOPPELKOPF } from "@/models/extras";

const notifier = new Notifier();

export class Trick {
  constructor(expectedNumberOfCards) {
    this.expectedNumberOfCards = expectedNumberOfCards;
    this.playedCards = [];
    this.finished = false;
    this.id = uniqueId("trick_");
  }

  add(card, player) {
    if (this.cardBy(player)) {
      if (player.isHuman) {
        notifier.info("not-your-turn");
        return;
      }
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
    return find(this.playedCards, { playerId: player.id });
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

    return {
      id: highestCard.playerId,
      name: highestCard.name
    };
  }

  points() {
    return this.playedCards.reduce(
      (acc, playedCard) => acc + playedCard.card.value,
      0
    );
  }

  extras() {
    if (this.points() >= 40) {
      return DOPPELKOPF;
    }
  }
}
