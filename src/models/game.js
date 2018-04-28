import { Player } from '@/models/player'
import { Deck } from '@/models/deck'
import { Trick } from '@/models/trick'
import { Hand } from '@/models/hand'
import { RingQueue } from '@/models/ringQueue'
import { Scorecard } from '@/models/scorecard'
import { find } from 'lodash'

export class Game {
  constructor () {
    const isHuman = true
    const isComputer = false
    this.players = [
      new Player('Player 1', isHuman, this),
      new Player('Player 2', isComputer, this),
      new Player('Player 3', isComputer, this),
      new Player('Player 4', isComputer, this)
    ]
    this.deck = new Deck()
    this.currentTrick = this.nextTrick()
    this.playerOrder = new RingQueue(this.players)
    this.scorecard = new Scorecard(this.players)
    this.deal()
  }

  deal () {
    this.players[0].hand = new Hand(this.deck.cards.slice(0, 10))
    this.players[1].hand = new Hand(this.deck.cards.slice(10, 20))
    this.players[2].hand = new Hand(this.deck.cards.slice(20, 30))
    this.players[3].hand = new Hand(this.deck.cards.slice(30, 40))
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
    if (!this.waitingForPlayer().isHuman) {
      this.waitingForPlayer().autoplay()
    }
  }

  finishTrick () {
    const playerName = this.currentTrick.winner()
    const winner = find(this.players, { name: playerName })
    winner.win(this.currentTrick)
    this.currentTrick = this.nextTrick()
    this.playerOrder.prioritize(winner)
  }
}
