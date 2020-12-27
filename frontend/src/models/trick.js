import { uniqueId } from "lodash-es";
import { PlayedCard, beats } from "@/models/playedCard";
import { ranks, suits } from "@/models/card";
import { extras as extrasModel } from "@/models/extras";

export class Trick {
  constructor(players) {
    this.players = players;
    this.expectedNumberOfCards = players.length;
    this.playedCards = [];
    this.finished = false;
    this.id = uniqueId("trick_");
    this.lastTrickInRound = false;
  }

  setLastTrickInRound() {
    this.lastTrickInRound = true;
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

  playerPlayedCards() {
    let playerPlayedCards = [];
    this.players.forEach(player => {
      let playerCard = this.cardBy(player);
      if (playerCard) {
        playerPlayedCards.push(playerCard);
      } else {
        playerPlayedCards.push(new PlayedCard(false, player));
      }
    });
    return playerPlayedCards;
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

  highestCard() {
    if (!this.playedCards[0]) {
      return undefined;
    }

    let highestCard = this.playedCards[0];
    for (let card of this.playedCards) {
      if (beats(card, highestCard) < 0) {
        highestCard = card;
      }
    }
    return highestCard;
  }

  winner() {
    let highestCard = this.highestCard();
    return highestCard ? highestCard.player : undefined;
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
      extras.push(extrasModel.doppelkopf);
    }
    extras = extras.concat(this.caughtFox());
    extras = extras.concat(this.caughtCharlie());
    if (this.charlie()) {
      extras.push(extrasModel.charlie);
    }
    return extras;
  }

  findFox() {
    return this.playedCards.filter(
      playedCard =>
        playedCard.card.rank === ranks.ace &&
        playedCard.card.suit === suits.diamonds
    );
  }

  caughtFox() {
    let extras = [];
    this.findFox().forEach(fox => {
      const caughtByOtherParty =
        (fox.player.isRe() && !this.winner().isRe()) ||
        (fox.player.isKontra() && !this.winner().isKontra());
      if (caughtByOtherParty) extras.push(extrasModel.fox);
    });
    return extras;
  }

  findCharlie() {
    return this.playedCards.filter(
      playedCard =>
        playedCard.card.rank === ranks.jack &&
        playedCard.card.suit === suits.clubs
    );
  }

  caughtCharlie() {
    let extras = [];
    if (this.lastTrickInRound) {
      this.findCharlie().forEach(charlie => {
        const caughtCharlie =
          (charlie.player.isRe() && !this.winner().isRe()) ||
          (charlie.player.isKontra() && !this.winner().isKontra());
        if (caughtCharlie) extras.push(extrasModel.charlie_caught);
      });
    }
    return extras;
  }

  charlie() {
    let charlies = this.findCharlie();
    if (this.lastTrickInRound && charlies.length > 0) {
      // first charlie has to be highest card in trick
      let charlie = charlies[0];
      const charlie_trump =
        ((charlie.player.isRe() && this.winner().isRe()) ||
          (charlie.player.isKontra() && this.winner().isKontra())) &&
        // here is the magic
        this.highestCard() === charlie;
      return charlie_trump;
    }
    return false;
  }
}
