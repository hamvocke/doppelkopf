import { Trick } from '@/models/trick'
import { Notifier } from '@/models/notifier'
import { RingQueue } from '@/models/ringQueue'
import { find } from 'lodash'

const notifier = new Notifier()

export class Round {
  constructor (players = []) {
    this.players = players
    this.playerOrder = new RingQueue(this.players)
    this.currentTrick = this.nextTrick()
    this.isFinished = false
  }

  nextTrick () {
    return new Trick(this.players.length)
  }

  nextPlayer () {
    this.playerOrder.next()
  }

  waitingForPlayer () {
    return this.playerOrder.current()
  }

  nextMove () {
    if (this.waitingForPlayer().isHuman) {
      notifier.info('It\'s your turn!')
      return
    }

    this.waitingForPlayer().autoplay()
  }

  findParties () {
    return {
      're': this.players.filter(player => player.isRe()),
      'kontra': this.players.filter(player => player.isKontra())
    }
  }

  finishTrick () {
    const playerName = this.currentTrick.winner()
    const winner = find(this.players, { name: playerName })
    winner.win(this.currentTrick)
    this.currentTrick = this.nextTrick()
    this.playerOrder.prioritize(winner)
  }

  finishRound () {
    this.isFinished = true
    // calculate score
    // add special events (fox, doppelkopf) to score - 'extrasRegistry'?
  }
}
