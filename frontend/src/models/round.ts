import { Trick } from "@/models/trick";
import { RingQueue } from "@/models/ringQueue";
import { Score } from "@/models/score";
import { options } from "@/models/options";
import { Notifier } from "@/models/notifier";
import { extras } from "@/models/extras";
import { PartyName, findParties, Party } from "@/models/party";
import { Player } from "./player";
import { Scorecard } from "./scorecard";

const notifier = new Notifier();

export class Round {
  players: Player[];
  parties: { [name: string]: Party };
  scorecard: Scorecard;
  score?: Score;
  finished: boolean;
  previousTrick?: Trick;
  currentTrick: Trick;
  playerOrder: RingQueue<Player>;

  constructor(
    players: Player[] = [],
    scorecard: any = {},
    openingPlayer: Player
  ) {
    this.players = players;
    this.parties = findParties(players);
    this.scorecard = scorecard;
    this.score = undefined;
    this.finished = false;
    this.currentTrick = this.nextTrick();

    this.playerOrder = new RingQueue(this.players);
    if (openingPlayer) {
      this.playerOrder.prioritize(openingPlayer);
    }
  }

  nextTrick() {
    this.previousTrick = this.currentTrick;
    let trick = new Trick(this.players);
    if (this.cardsLeft() <= this.players.length) trick.setLastTrickInRound();
    return trick;
  }

  nextPlayer() {
    this.playerOrder.next();
  }

  waitingForPlayer() {
    return this.playerOrder.current();
  }

  async nextMove() {
    if (this.waitingForPlayer().isHuman) {
      return;
    }

    if (this.currentTrick.isFinished() || this.isFinished()) {
      return;
    }

    await this.waitingForPlayer().autoplay();
  }

  noMoreCardsLeft() {
    return this.cardsLeft() === 0;
  }

  cardsLeft() {
    const sumCardsFn = (acc: number, player: Player) =>
      acc + player.hand.cards.length;
    return this.players.reduce(sumCardsFn, 0);
  }

  isFinished() {
    return this.finished;
  }

  async finishTrick() {
    await this.evaluateLatestTrick();

    this.currentTrick = this.nextTrick();

    if (options.autoplay === true) {
      this.nextMove();
    }
  }

  async evaluateLatestTrick() {
    const winner = this.currentTrick.winner()!;

    this.players.forEach(player =>
      player.memory.memorizeTrick(
        this.currentTrick.id,
        this.currentTrick.baseCard()!,
        winner
      )
    );

    winner.win(this.currentTrick);
    this.playerOrder.prioritize(winner);
    await this.showExtras();
  }

  async showExtras() {
    for (let extra of this.currentTrick.extras()) {
      switch (extra) {
        case extras.doppelkopf:
          // todo i18n
          await notifier.flash("Doppelkopf");
          break;
      }
    }
  }

  async finishRound() {
    if (!this.noMoreCardsLeft()) {
      throw new Error(`Can't finish a round before all cards have been played`);
    }

    await this.evaluateLatestTrick();

    this.currentTrick = this.nextTrick();

    this.parties = findParties(this.players);
    this.score = new Score(
      this.parties[PartyName.Re],
      this.parties[PartyName.Kontra]
    );
    this.scorecard.addScore(this.score);
    this.finished = true;
  }
}
