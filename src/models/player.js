import { includes } from 'lodash'
import { Hand } from '@/models/hand'
import { TrickStack } from '@/models/trickStack'
import { RandomCardBehavior } from '@/models/behaviors'
import { Notifier } from '@/models/notifier'
import { playableCards } from '@/models/playableCardFinder'

const notifier = new Notifier()

export class Player {
  constructor (name, isHuman = false, game = {}) {
    this.name = name
    this.hand = new Hand()
    this.isHuman = isHuman
    this.trickStack = new TrickStack()
    this.game = game
    this.behavior = new RandomCardBehavior()
  }

  isRe () {
    return this.hand.isRe()
  }

  isKontra () {
    return !this.isRe()
  }

  play (card) {
    if (this.game.currentRound.waitingForPlayer() !== this) {
      notifier.info(`It's not your turn, buddy!`)
      return
    }

    let cardToBePlayed = this.hand.find(card)
    if (!card || !cardToBePlayed) {
      throw new Error('can\'t play a card that\'s not on the player\'s hand')
    }

    if (!this.canPlay(card)) {
      notifier.info(`You can't play that card`)
      return
    }

    this.game.currentTrick.add(cardToBePlayed, this)
    this.hand.remove(cardToBePlayed)
    this.game.currentRound.nextPlayer()
  }

  canPlay (card) {
    const baseCard = this.game.currentTrick.baseCard()
    const playable = playableCards(this.hand.cards, baseCard)
    return includes(playable, card)
  }

  autoplay () {
    const cardToBePlayed = this.behavior.cardToPlay(this.hand, this.game.currentTrick.baseCard())
    this.play(cardToBePlayed)
  }

  win (trick) {
    this.trickStack.add(trick)
  }

  points () {
    return this.trickStack.points()
  }
}
