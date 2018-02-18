import { Hand } from '@/models/hand'
import { TrickStack } from '@/models/trickStack'
import { trickRegistry } from '@/models/trickRegistry'

export class Player {
  constructor (name, isHuman = false) {
    this.name = name
    this.hand = new Hand()
    this.isHuman = isHuman
    this.trickStack = new TrickStack()
  }

  play (card) {
    let cardToBePlayed = this.hand.find(card)

    if (!card || !cardToBePlayed) {
      throw new Error('can\'t play a card that\'s not on the player\'s hand')
    }

    trickRegistry.current().add(cardToBePlayed, this)
    this.hand.remove(cardToBePlayed)
  }

  win (trick) {
    this.trickStack.add(trick)
  }
}
