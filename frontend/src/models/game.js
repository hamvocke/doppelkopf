import { Round } from "@/models/round";
import { Player } from "@/models/player";
import { Deck } from "@/models/deck";
import { Hand } from "@/models/hand";
import { Scorecard } from "@/models/scorecard";
import { RingQueue } from "@/models/ringQueue";
import { generateNames } from "@/models/random";
import { Telemetry } from "@/models/telemetry";

export class Game {
  constructor(players = []) {
    this.players = players;
    this.players.map(p => (p.game = this));
    this.playerOpeningOrder = new RingQueue(this.players);
    this.deck = new Deck();
    this.scorecard = new Scorecard(this.players);
    this.currentRound = new Round(
      this.players,
      this.scorecard,
      this.playerOpeningOrder.current()
    );
    this.deal();
    Telemetry.newGame();
  }

  static singlePlayer() {
    const isHuman = true;
    const isComputer = false;
    const randomNames = generateNames(4);
    return new Game([
      new Player(randomNames[0], isHuman, true, "bottom"),
      new Player(randomNames[1], isComputer, false, "left"),
      new Player(randomNames[2], isComputer, false, "top"),
      new Player(randomNames[3], isComputer, false, "right")
    ]);
  }

  static multiPlayer(players) {
    return new Game(players);
  }

  // todo: make this configurable for playing with 9s
  deal() {
    let hands = [];

    do {
      this.deck = new Deck();
      hands[0] = new Hand(this.deck.cards.slice(0, 10));
      hands[1] = new Hand(this.deck.cards.slice(10, 20));
      hands[2] = new Hand(this.deck.cards.slice(20, 30));
      hands[3] = new Hand(this.deck.cards.slice(30, 40));
    } while (!hands.every(hand => hand.isPlayable()));

    this.players[0].hand = hands[0];
    this.players[1].hand = hands[1];
    this.players[2].hand = hands[2];
    this.players[3].hand = hands[3];
  }

  get playerOpening() {
    return this.playerOpeningOrder.current();
  }

  get currentTrick() {
    return this.currentRound.currentTrick;
  }

  nextRound() {
    this.currentRound = new Round(
      this.players,
      this.scorecard,
      this.playerOpeningOrder.next()
    );
    this.clearTrickStacks();
    this.deal();
    this.currentRound.nextMove();
  }

  clearTrickStacks() {
    this.players.forEach(player => player.clearTrickStack());
  }
}
