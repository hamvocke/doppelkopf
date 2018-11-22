import { Round } from "@/models/round";
import { Player } from "@/models/player";
import { Deck } from "@/models/deck";
import { Hand } from "@/models/hand";
import { Scorecard } from "@/models/scorecard";
import { generateNames } from "@/models/nameGenerator";

export class Game {
  constructor() {
    const isHuman = true;
    const isComputer = false;
    const randomNames = generateNames(4);
    this.players = [
      new Player(randomNames[0], isHuman, "bottom", this),
      new Player(randomNames[1], isComputer, "left", this),
      new Player(randomNames[2], isComputer, "top", this),
      new Player(randomNames[3], isComputer, "right", this)
    ];
    this.started = false;
    this.deck = new Deck();
    this.currentRound = new Round(this.players, this);
    this.scorecard = new Scorecard(this.players);
    this.deal();
  }

  start() {
    this.started = true;
  }

  isStarted() {
    return this.started;
  }

  deal() {
    this.deck = new Deck();

    this.players[0].hand = new Hand(this.deck.cards.slice(0, 10));
    this.players[1].hand = new Hand(this.deck.cards.slice(10, 20));
    this.players[2].hand = new Hand(this.deck.cards.slice(20, 30));
    this.players[3].hand = new Hand(this.deck.cards.slice(30, 40));
  }

  get currentTrick() {
    return this.currentRound.currentTrick;
  }

  nextRound() {
    this.currentRound = new Round(this.players, this);
    this.clearTrickStacks();
    this.deal();
  }

  clearTrickStacks() {
    this.players.forEach(player => player.clearTrickStack());
  }

  addScore(winningParty, score) {
    this.scorecard.addScore(winningParty, score);
  }
}
