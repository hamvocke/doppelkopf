import { find } from 'lodash'

let instance

export class PlayerRepository {
  constructor () {
    if (instance) {
      return instance
    }

    this.players = []

    instance = this
  }

  register (player) {
    this.players.push(player)
  }

  findByName (name) {
    return find(this.players, { name: name })
  }
}
