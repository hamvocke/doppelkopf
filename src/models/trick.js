export class Trick {
  constructor (expectedNumberOfCards) {
    this.expectedNumberOfCards = expectedNumberOfCards
    this.cards = []
    this.finished = false
  }

  add (card, player) {
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

  isFinished () {
    return this.finished
  }
}
