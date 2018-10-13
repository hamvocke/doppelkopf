import { includes } from "lodash";

export class Scorecard {
  constructor(players) {
    this.players = players;
    this.scoreLines = [];
  }

  addScore(winningPlayers, points) {
    let scoreLine = {};

    this.players.forEach(player => {
      scoreLine[player.name] = includes(winningPlayers, player)
        ? points
        : -points;
    });

    this.scoreLines.push(scoreLine);
  }

  scoreFor(player) {
    return this.scoreLines.reduce((acc, scoreLine) => {
      acc += scoreLine[player.name];
      return acc;
    }, 0);
  }
}
