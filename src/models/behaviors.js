export class HighestCardBehavior {
  cardToPlay (hand, baseCard) {
    return hand.playableCards(baseCard)[0]
  }
}
