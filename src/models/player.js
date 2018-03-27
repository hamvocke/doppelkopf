import { Hand } from '@/models/hand'
import { TrickStack } from '@/models/trickStack'
import { HighestCardBehavior } from '@/models/behaviors'

export class Player {
  constructor (name, isHuman = false, game = {}) {
    this.name = name
    this.hand = new Hand()
    this.isHuman = isHuman
    this.trickStack = new TrickStack()
    this.game = game
    this.behavior = new HighestCardBehavior()
  }

  play (card) {
    let cardToBePlayed = this.hand.find(card)

    if (!card || !cardToBePlayed) {
      throw new Error('can\'t play a card that\'s not on the player\'s hand')
    }

    this.game.currentTrick.add(cardToBePlayed, this)
    this.hand.remove(cardToBePlayed)
  }

  autoplay () {
    const cardToBePlayed = this.behavior.cardToPlay(this.hand, this.game.currentTrick.baseCard())
    this.play(cardToBePlayed)
  }

  win (trick) {
    this.trickStack.add(trick)
  }
}
