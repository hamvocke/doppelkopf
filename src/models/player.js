import { Hand } from '@/models/hand'
import { TrickStack } from '@/models/trickStack'

export class Player {
  constructor (name, isHuman = false, game = {}) {
    this.name = name
    this.hand = new Hand()
    this.isHuman = isHuman
    this.trickStack = new TrickStack()
    this.game = game
  }

  play (card) {
    let cardToBePlayed = this.hand.find(card)

    if (!card || !cardToBePlayed) {
      throw new Error('can\'t play a card that\'s not on the player\'s hand')
    }

    this.game.currentTrick.add(cardToBePlayed, this)
    this.hand.remove(cardToBePlayed)
    this.game.nextMove()
  }

  // autoplay () {
  //   const cardToBePlayed = this.hand.playableCards(this.game.currentTrick.baseCard())[0]
  //
  //   console.log(`${this.name}: playing ${this.card}`)
  //
  //   this.play(cardToBePlayed)
  // }

  win (trick) {
    this.trickStack.add(trick)
  }
}
