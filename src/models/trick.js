import { find } from 'lodash'

export class Trick {
  constructor (expectedNumberOfCards) {
    this.expectedNumberOfCards = expectedNumberOfCards
    this.cards = []
    this.finished = false
  }

  add (card, player) {
    if (this.cardBy(player)) {
      throw Error(`Player ${player.name} already played a card`)
    }

    const playedCard = {
      card: card,
      playedBy: player.name
    }
    this.cards.push(playedCard)

    if (this.cards.length === this.expectedNumberOfCards) {
      this.finished = true
    }
  }

  playedCards () {
    return this.cards
  }

  cardBy (player) {
    return find(this.cards, ['playedBy', player.name])
  }

  isFinished () {
    return this.finished
  }
}
