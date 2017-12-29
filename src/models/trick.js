export class Trick {
  constructor () {
    this.cards = []
    this.finished = false
  }

  add (card) {
    this.cards.push(card)

    if (this.cards.length === 4) {
      this.finished = true
    }
  }

  isFinished () {
    return this.finished
  }
}
