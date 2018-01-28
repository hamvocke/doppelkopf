import { Hand } from '@/models/hand'

export class Player {
  constructor (name, game, isHuman = false) {
    this.name = name
    this.hand = new Hand()
    this.game = game
    this.isHuman = isHuman
  }

  play (card) {
    let cardToBePlayed = this.hand.find(card)

    if (!card || !cardToBePlayed) {
      throw new Error('can\'t play a card that\'s not on the player\'s hand')
    }

    this.game.currentTrick.add(cardToBePlayed, this)
    this.hand.remove(cardToBePlayed)
  }
}
