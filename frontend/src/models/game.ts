import { Round } from "@/models/round";
import { Player } from "@/models/player";
import { Deck } from "@/models/deck";
import { Hand } from "@/models/hand";
import { Scorecard } from "@/models/scorecard";
import { RingQueue } from "@/models/ringQueue";
import { generateNames } from "@/models/random";
import { Telemetry } from "@/models/telemetry";
import { TablePosition } from "./tablePosition";
import { GameRules, RoundRules } from "./rules";

export class Game {
  players: Player[];
  private playerOpeningOrder: RingQueue<Player>;
  deck: Deck;
  scorecard: Scorecard;
  currentRound: Round;
  rules: GameRules[];

  constructor(players: Player[] = []) {
    this.players = players;
    this.players.map(p => (p.game = this));
    this.playerOpeningOrder = new RingQueue(this.players);
    this.deck = new Deck();
    this.deal();
    this.scorecard = new Scorecard(this.players);
    this.currentRound = new Round(
      this.players,
      this.scorecard,
      this.playerOpeningOrder.current()
    );
    this.initializeAffinities();
    Telemetry.newGame();
    this.rules = [
      GameRules.SHARP_DOKO,
      GameRules.FOX,
      GameRules.DOPPELKOPF,
      GameRules.CHARLIE
    ];
  }

  static singlePlayer() {
    const isHuman = true;
    const isComputer = false;
    const randomNames = generateNames(4);
    const playerName = localStorage.getItem("name") || randomNames[0];
    return new Game([
      new Player(playerName, isHuman, true, TablePosition.Bottom),
      new Player(randomNames[1], isComputer, false, TablePosition.Left),
      new Player(randomNames[2], isComputer, false, TablePosition.Top),
      new Player(randomNames[3], isComputer, false, TablePosition.Right)
    ]);
  }

  // TODO at some point remove isPlayable and replace with reservation option
  deal() {
    let hands = [];

    do {
      this.deck = new Deck([RoundRules.SHARP_DOKO]);
      const handLength = this.deck.cards.length / this.players.length;
      for (let i = 0; i < this.players.length; i++) {
        hands[i] = new Hand(
          this.deck.cards.slice(i * handLength, (i + 1) * handLength)
        );
      }
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

  get previousTrick() {
    return this.currentRound.previousTrick;
  }

  nextRound() {
    this.deal();
    this.currentRound = new Round(
      this.players,
      this.scorecard,
      this.playerOpeningOrder.next()
    );
    this.resetPlayers();
    this.currentRound.nextMove();
  }

  resetPlayers() {
    this.players.forEach(player => player.reset());
  }

  initializeAffinities() {
    this.players.forEach(player =>
      player.behavior.affinities.setPlayers(this.players)
    );
  }
}
