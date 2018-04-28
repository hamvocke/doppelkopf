export class Scorecard {
  constructor (players) {
    this.players = players
    this.scoreLines = []
  }

  addScoreLine (scoreLine) {
    this.scoreLines.push(scoreLine)
  }

  scoreFor (player) {
    return this.scoreLines.reduce((acc, scoreLine) => {
      acc += scoreLine[player.name]
      return acc
    }, 0)
  }
}
