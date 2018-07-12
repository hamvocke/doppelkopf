import { includes } from 'lodash'

export class Scorecard {
  constructor (players) {
    this.players = players
    this.scoreLines = []
  }

  addScore (winningPlayers, points) {
    let scoreLine = {}

    for (let player of this.players) {
      if (includes(winningPlayers, player)) {
        scoreLine[player.name] = points
      } else {
        scoreLine[player.name] = -points
      }
    }

    this.scoreLines.push(scoreLine)
  }

  scoreFor (player) {
    return this.scoreLines.reduce((acc, scoreLine) => {
      acc += scoreLine[player.name]
      return acc
    }, 0)
  }
}
