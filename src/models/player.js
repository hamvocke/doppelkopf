import { Hand } from '@/models/hand'
import { TrickStack } from '@/models/trickStack'
import { HighestCardBehavior } from '@/models/behaviors'
import { Notifier } from '@/models/notifier'

const notifier = new Notifier()

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
    if (this.game.waitingForPlayer() !== this) {
      notifier.info(`It's not your turn, buddy!`)
      return
    }

    let cardToBePlayed = this.hand.find(card)
    if (!card || !cardToBePlayed) {
      throw new Error('can\'t play a card that\'s not on the player\'s hand')
    }

    this.game.currentTrick.add(cardToBePlayed, this)
    this.hand.remove(cardToBePlayed)
    this.game.nextPlayer()
  }

  autoplay () {
    const cardToBePlayed = this.behavior.cardToPlay(this.hand, this.game.currentTrick.baseCard())
    this.play(cardToBePlayed)
  }

  win (trick) {
    this.trickStack.add(trick)
  }
}
