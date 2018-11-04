import { includes, last } from "lodash";

export class Scorecard {
  constructor(players) {
    this.players = players;
    this.scoreLines = [];
  }

  addScore(winningPlayers, points) {
    const score = {};
    this.players.forEach(player => {
      score[player.name] = includes(winningPlayers, player)
        ? this.scoreFor(player) + points
        : this.scoreFor(player) - points;
    });

    const scoreline = new Scoreline(score, winningPlayers, points);
    this.scoreLines.push(scoreline);
  }

  scoreFor(player) {
    if (!last(this.scoreLines)) {
      return 0;
    }
    return last(this.scoreLines).score[player.name];
  }
}

export class Scoreline {
  constructor(score, winners, points) {
    this.score = score;
    this.winners = winners;
    this.points = points;
  }
}
