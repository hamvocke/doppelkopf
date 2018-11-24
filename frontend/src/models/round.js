import { Trick } from "@/models/trick";
import { RingQueue } from "@/models/ringQueue";
import { Score } from "@/models/score";
import { options } from "@/models/options";
import { find } from "lodash";

export class Round {
  constructor(players = [], game = {}) {
    this.players = players;
    this.playerOrder = new RingQueue(this.players);
    this.currentTrick = this.nextTrick();
    this.finished = false;
    this.game = game;
  }

  nextTrick() {
    return new Trick(this.players.length);
  }

  nextPlayer() {
    this.playerOrder.next();
  }

  waitingForPlayer() {
    return this.playerOrder.current();
  }

  nextMove() {
    if (this.waitingForPlayer().isHuman) {
      return;
    }

    if (this.currentTrick.isFinished() || this.isFinished()) {
      return;
    }

    this.waitingForPlayer().autoplay();
  }

  noMoreCardsLeft() {
    const sumCardsFn = (acc, player) => acc + player.hand.cards.length;
    const sumOfCardsLeft = this.players.reduce(sumCardsFn, 0);
    return sumOfCardsLeft === 0;
  }

  isFinished() {
    return this.finished;
  }

  finishTrick() {
    this.evaluateLastTrick();

    this.currentTrick = this.nextTrick();

    if (options.autoplay === true) {
      this.nextMove();
    }
  }

  evaluateLastTrick() {
    const playerId = this.currentTrick.winner().id;
    const winner = find(this.players, { id: playerId });
    winner.win(this.currentTrick);
    this.playerOrder.prioritize(winner);
  }

  finishRound() {
    if (!this.noMoreCardsLeft()) {
      throw new Error(`Can't finish a round before all cards have been played`);
    }

    this.evaluateLastTrick();

    this.currentTrick = this.nextTrick();

    const score = this.calculateScore();
    this.game.addScore(score);
    this.finished = true;
    this.score = score;
  }

  calculateScore() {
    return new Score(this.players);
  }
}
