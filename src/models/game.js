import { Round } from '@/models/round'
import { Player } from '@/models/player'
import { Deck } from '@/models/deck'
import { Hand } from '@/models/hand'
import { Scorecard } from '@/models/scorecard'

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
    this.currentRound = new Round(this.players, this)
    this.scorecard = new Scorecard(this.players)
    this.deal()
  }

  deal () {
    this.currentRound.players[0].hand = new Hand(this.deck.cards.slice(0, 10))
    this.currentRound.players[1].hand = new Hand(this.deck.cards.slice(10, 20))
    this.currentRound.players[2].hand = new Hand(this.deck.cards.slice(20, 30))
    this.currentRound.players[3].hand = new Hand(this.deck.cards.slice(30, 40))
  }

  get currentTrick () {
    return this.currentRound.currentTrick
  }
}
