import { Player } from '@/models/player'
import { Deck } from '@/models/deck'
import { Trick } from '@/models/trick'
import { Hand } from '@/models/hand'
import { trickRegistry } from '@/models/trickRegistry'
import { find } from 'lodash'

export class Game {
  constructor () {
    const isHuman = true
    const isComputer = false
    this.players = [
      new Player('Player 1', isHuman),
      new Player('Player 2', isComputer),
      new Player('Player 3', isComputer),
      new Player('Player 4', isComputer)
    ]
    this.deck = new Deck()
    this.nextTrick()
    this.deal()
  }

  deal () {
    this.players[0].hand = new Hand(this.deck.cards.slice(0, 10))
    this.players[1].hand = new Hand(this.deck.cards.slice(10, 20))
    this.players[2].hand = new Hand(this.deck.cards.slice(20, 30))
    this.players[3].hand = new Hand(this.deck.cards.slice(30, 40))
  }

  nextTrick () {
    trickRegistry.add(new Trick(this.players.length))
  }

  finishTrick () {
    const playerName = trickRegistry.current().winner()
    const player = find(this.players, { name: playerName })
    player.win(trickRegistry.current())
    this.nextTrick()
  }
}
