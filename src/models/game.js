import { Player } from '@/models/player'
import { Deck } from '@/models/deck'
import { Trick } from '@/models/trick'
import { Hand } from '@/models/hand'
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

  finishTrick () {
    const playerName = this.currentTrick.winner()
    const player = find(this.players, { name: playerName })
    player.win(this.currentTrick)
    this.currentTrick = this.nextTrick()
  }
}
