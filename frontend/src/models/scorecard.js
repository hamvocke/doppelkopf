import { includes, last } from "lodash-es";

export class Scorecard {
  constructor(players) {
    this.players = players;
    this.scoreLines = [];
  }

  addScore(score) {
    const newTotalPoints = {};
    const winningPlayers = score.winner().players;
    const points = score.totalPoints();
    this.players.forEach(p => {
      newTotalPoints[p.id] = includes(winningPlayers, p)
        ? this.totalPointsFor(p) + points
        : this.totalPointsFor(p) - points;
    });

    const scoreline = new Scoreline(newTotalPoints, winningPlayers, points);
    this.scoreLines.push(scoreline);
  }

  totalPointsFor(player) {
    if (!last(this.scoreLines)) {
      return 0;
    }
    return last(this.scoreLines).totalPoints[player.id];
  }
}

let lineIndex = 0;
export class Scoreline {
  constructor(totalPoints, winners, points) {
    this.id = lineIndex++;
    this.totalPoints = totalPoints;
    this.winners = winners;
    this.points = points;
  }
}
