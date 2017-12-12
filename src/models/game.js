import Player from '@/models/player'
import { Deck } from '@/models/deck'
import Trick from '@/models/trick'
import Hand from '@/models/hand'

export default class Game {
  constructor () {
    this.players = [
      new Player('Player 1', this),
      new Player('Player 2', this),
      new Player('Player 3', this),
      new Player('Player 4', this)
    ]
    this.deck = new Deck()
    this.currentTrick = new Trick()
    this.deal()
  }

  deal () {
    this.players[0].hand = new Hand(this.deck.cards.slice(0, 10))
    this.players[1].hand = new Hand(this.deck.cards.slice(10, 20))
    this.players[2].hand = new Hand(this.deck.cards.slice(20, 30))
    this.players[3].hand = new Hand(this.deck.cards.slice(30, 40))
  }
}
