import { find } from 'lodash'

export class Evaluator {
  constructor (game = {}) {
    this.game = game
  }

  evaluateTrick (trick) {
    const winner = find(this.game.players, { name: trick.winner() })
    winner.win(trick)
  }
}
