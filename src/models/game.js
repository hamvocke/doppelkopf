import { Player } from '@/models/player'
import { Deck } from '@/models/deck'
import { Trick } from '@/models/trick'
import { Hand } from '@/models/hand'

export class Game {
  constructor () {
    const isHuman = true
    const isComputer = false
    this.players = [
      new Player('Player 1', this, isHuman),
      new Player('Player 2', this, isComputer),
      new Player('Player 3', this, isComputer),
      new Player('Player 4', this, isComputer)
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
    const trick = new Trick(this.players.length)
    trick.subscribe(() => {})
    return trick
  }
}
