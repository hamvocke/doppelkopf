import { Trick } from '@/models/trick'
import { Notifier } from '@/models/notifier'
import { RingQueue } from '@/models/ringQueue'
import { Score } from '@/models/score'
import { re, kontra } from '@/models/parties'
import { options } from '@/models/options'
import { find } from 'lodash'

const notifier = new Notifier()

export class Round {
  constructor (players = [], game = {}) {
    this.players = players
    this.playerOrder = new RingQueue(this.players)
    this.currentTrick = this.nextTrick()
    this.finished = false
    this.game = game
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

    if (this.currentTrick.isFinished() || this.isFinished()) {
      return
    }

    this.waitingForPlayer().autoplay()
  }

  findParties () {
    return {
      [re]: this.players.filter(player => player.isRe()),
      [kontra]: this.players.filter(player => player.isKontra())
    }
  }

  noMoreCardsLeft () {
    const sumCardsFn = (acc, player) => acc + player.hand.cards.length
    const sumOfCardsLeft = this.players.reduce(sumCardsFn, 0)
    return sumOfCardsLeft === 0
  }

  isFinished () {
    return this.finished
  }

  finishTrick () {
    this.evaluateLastTrick()

    this.currentTrick = this.nextTrick()

    if (options.autoplay === true) {
      this.nextMove()
    }
  }

  evaluateLastTrick () {
    const playerName = this.currentTrick.winner()
    const winner = find(this.players, { name: playerName })
    winner.win(this.currentTrick)
    this.playerOrder.prioritize(winner)
  }

  finishRound () {
    if (!this.noMoreCardsLeft()) {
      throw new Error(`Can't finish a round before all cards have been played`)
    }

    this.evaluateLastTrick()

    this.currentTrick = this.nextTrick()

    const score = this.calculateScore()
    const winningParty = this.findParties()[score.winner()]
    this.game.addScore(winningParty, score.points())
    this.finished = true
    // add special events (fox, doppelkopf) to score - 'extrasRegistry'?
  }

  calculateScore () {
    // return Score with points, extra points (fuchs gefangen...)
    // use extra point detector to find out if trick contains extra points. use here and when finishing a trick (to display notifications)
    const parties = this.findParties()
    const sumPointsForParty = (acc, player) => acc + player.points()
    const rePoints = parties[re].reduce(sumPointsForParty, 0)
    const kontraPoints = parties[kontra].reduce(sumPointsForParty, 0)
    return new Score(rePoints, kontraPoints)
  }
}
