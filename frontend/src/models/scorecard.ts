import { includes, last } from "lodash-es";
import { Player } from "./player";
import { Score } from "./score";

export class Scorecard {
  players: Player[];
  scoreLines: Scoreline[];

  constructor(players: Player[]) {
    this.players = players;
    this.scoreLines = [];
  }

  addScore(score: Score) {
    const newTotalPoints: { [playerId: string]: number } = {};
    const winningPlayers = score.winner()?.players;
    const winnerPoints = score.totalPoints(score.winningPartyName()!);
    const loserPoints = score.totalPoints(score.losingPartyName()!);

    this.players.forEach(p => {
      newTotalPoints[p.id] = includes(winningPlayers, p)
        ? this.totalPointsFor(p) + winnerPoints
        : this.totalPointsFor(p) + loserPoints;
    });

    const scoreline = new Scoreline(
      newTotalPoints,
      winningPlayers!,
      winnerPoints
    );
    this.scoreLines.push(scoreline);
  }

  totalPointsFor(player: Player) {
    if (!last(this.scoreLines)) {
      return 0;
    }
    return last(this.scoreLines)!.totalPoints[player.id];
  }
}

let lineIndex = 0;
export class Scoreline {
  id: number;
  totalPoints: { [playerId: string]: number };
  winners: Player[];
  points: number;

  constructor(
    totalPoints: { [playerId: string]: number },
    winners: Player[],
    points: number
  ) {
    this.id = lineIndex++;
    this.totalPoints = totalPoints;
    this.winners = winners;
    this.points = points;
  }
}
