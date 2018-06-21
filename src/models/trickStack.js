import { flatMap } from 'lodash'

export class TrickStack {
  constructor (tricks = []) {
    this.tricks = tricks
  }

  add (trick) {
    if (!trick.isFinished()) {
      throw new Error('can not add an unfinished trick to the trick stack')
    }

    this.tricks.push(trick)
  }

  cards () {
    const playedCards = flatMap(this.tricks, (trick) => trick.playedCards)
    return playedCards.map(playedCard => playedCard.card)
  }

  points () {
    return this.tricks.reduce((acc, trick) => acc + trick.points(), 0)
  }
}
