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
    this.started = false;
    this.deck = new Deck();
    this.currentRound = new Round(
      this.players,
      this,
      this.playerOpeningOrder.current()
    );
    this.scorecard = new Scorecard(this.players);
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

  deal() {
    this.deck = new Deck();

    this.players[0].hand = new Hand(this.deck.cards.slice(0, 10));
    this.players[1].hand = new Hand(this.deck.cards.slice(10, 20));
    this.players[2].hand = new Hand(this.deck.cards.slice(20, 30));
    this.players[3].hand = new Hand(this.deck.cards.slice(30, 40));
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
      this,
      this.playerOpeningOrder.next()
    );
    this.clearTrickStacks();
    this.deal();
    this.currentRound.nextMove();
  }

  clearTrickStacks() {
    this.players.forEach(player => player.clearTrickStack());
  }

  addScore(score) {
    this.scorecard.addScore(score.winner(), score.points());
  }
}
