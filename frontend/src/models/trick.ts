import { uniqueId } from "lodash-es";
import { Card, queen } from "@/models/card";
import { PlayedCard } from "@/models/playedCard";
import { Rank, Suit } from "@/models/card";
import { Extra, extras as extrasModel } from "@/models/extras";
import { Player } from "./player";
import { AffinityEvent } from "./affinities";

export class Trick {
  players: Player[];
  playedCards: PlayedCard[];
  id: string;
  lastTrickInRound: boolean;
  finished: boolean;
  private expectedNumberOfCards: number;

  constructor(players: Array<any>) {
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

  add(card: Card, player: Player) {
    if (this.cardBy(player)) {
      throw Error(`Player ${player.name} already played a card`);
    }

    const playedCard = new PlayedCard(card, player);

    this.playedCards.push(playedCard);

    if (this.playedCards.length === this.expectedNumberOfCards) {
      this.finished = true;
    }

    this.players.forEach(playerLoop => {
      playerLoop.memory.memorize(new PlayedCard(card, player), this.id);
    });

    this.checkForAffinityEvent(card, player);
  }

  checkForAffinityEvent(card: Card, player: Player): void {
    if (card.compareTo(queen.of(Suit.Clubs)) === 0) {
      this.players.forEach(p => {
        p.behavior.handleAffinityEvent(AffinityEvent.QueenOfClubs, player);
      });
    }
  }

  cards() {
    return this.playedCards;
  }

  cardBy(player: any) {
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

    let highestPlayed = this.playedCards[0];
    for (let played of this.playedCards) {
      if (played.card.beats(highestPlayed.card)) {
        highestPlayed = played;
      }
    }
    return highestPlayed;
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
    let extras = new Array<Extra>();
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
        playedCard.card.rank === Rank.Ace &&
        playedCard.card.suit === Suit.Diamonds
    );
  }

  caughtFox() {
    let extras: Array<Extra> = [];
    this.findFox().forEach(fox => {
      const caughtByOtherParty =
        (fox.player.isRe() && !this.winner()?.isRe()) ||
        (fox.player.isKontra() && !this.winner()?.isKontra());
      if (caughtByOtherParty) extras.push(extrasModel.fox);
    });
    return extras;
  }

  findCharlie() {
    return this.playedCards.filter(
      playedCard =>
        playedCard.card.rank === Rank.Jack &&
        playedCard.card.suit === Suit.Clubs
    );
  }

  caughtCharlie() {
    let extras: Array<Extra> = [];
    if (this.lastTrickInRound) {
      this.findCharlie().forEach(charlie => {
        const caughtCharlie =
          (charlie.player.isRe() && !this.winner()?.isRe()) ||
          (charlie.player.isKontra() && !this.winner()?.isKontra());
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
        ((charlie.player.isRe() && this.winner()?.isRe()) ||
          (charlie.player.isKontra() && this.winner()?.isKontra())) &&
        // here is the magic
        this.highestCard() === charlie;
      return charlie_trump;
    }
    return false;
  }
}
