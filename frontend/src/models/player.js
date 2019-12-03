import { includes, uniqueId } from "lodash-es";
import { Hand } from "@/models/hand";
import { TrickStack } from "@/models/trickStack";
import { RandomCardBehavior } from "@/models/behaviors";
import { Notifier } from "@/models/notifier";
import { options } from "@/models/options";
import { playableCards } from "@/models/playableCardFinder";

const notifier = new Notifier();

export class Player {
  constructor(name, isHuman = false, tablePosition = "bottom", game = {}) {
    this.id = uniqueId("player_");
    this.name = name;
    this.hand = new Hand();
    this.isHuman = isHuman;
    this.trickStack = new TrickStack(this);
    this.tablePosition = tablePosition;
    this.game = game;
    this.behavior = new RandomCardBehavior();
  }

  isRe() {
    return this.hand.isRe();
  }

  isKontra() {
    return !this.isRe();
  }

  autoplay() {
    const cardToBePlayed = this.behavior.cardToPlay(
      this.hand,
      this.game.currentTrick.baseCard()
    );
    this.play(cardToBePlayed);
  }

  // TODO: Make this one async to allow updates to be scheduled correctly?
  play(card) {
    if (this.game.currentRound.waitingForPlayer() !== this) {
      notifier.info("not-your-turn");
      return;
    }

    let cardToBePlayed = this.hand.find(card);
    if (!card || !cardToBePlayed) {
      throw new Error("can't play a card that's not on the player's hand");
    }
    if (!this.canPlay(card)) {
      notifier.info("cant-play-card");
      return;
    }

    this.game.currentTrick.add(cardToBePlayed, this);
    this.hand.remove(cardToBePlayed);
    this.game.currentRound.nextPlayer();

    if (options.autoplay === true) {
      setTimeout(() => this.game.currentRound.nextMove(), 800);
    }
  }

  canPlay(card) {
    const baseCard = this.game.currentTrick.baseCard();
    const playable = playableCards(this.hand.cards, baseCard);
    return includes(playable, card);
  }

  win(trick) {
    this.trickStack.add(trick);
  }

  clearTrickStack() {
    this.trickStack = new TrickStack(this);
  }

  points() {
    return this.trickStack.points();
  }
}
