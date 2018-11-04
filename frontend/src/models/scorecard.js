import { includes } from "lodash";

export class Scorecard {
  constructor(players) {
    this.players = players;
    this.scoreLines = [];
  }

  addScore(winningPlayers, points) {
    const scoreline = new Scoreline(this.players, points, winningPlayers);
    this.scoreLines.push(scoreline);
  }

  scoreFor(player) {
    return this.scoreLines.reduce((acc, scoreLine) => {
      acc += scoreLine[player.name];
      return acc;
    }, 0);
  }
}

export class Scoreline {
  constructor(players, points, winners) {
    this.points = points;
    this.winners = winners;
    this.score = {};

    players.forEach(player => {
      this.score[player.name] = includes(winners, player) ? points : -points;
    });
  }
}
