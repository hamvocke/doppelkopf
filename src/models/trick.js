export class Trick {
  constructor (expectedNumberOfCards) {
    this.expectedNumberOfCards = expectedNumberOfCards
    this.cards = []
    this.finished = false
  }

  add (card) {
    this.cards.push(card)

    if (this.cards.length === this.expectedNumberOfCards) {
      this.finished = true
    }
  }

  isFinished () {
    return this.finished
  }
}
