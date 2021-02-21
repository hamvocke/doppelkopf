import { includes, uniqueId } from "lodash-es";
import { Hand } from "@/models/hand";
import { TrickStack } from "@/models/trickStack";
import { Behavior, RuleBasedBehaviour } from "@/models/behaviors";
import { Notifier } from "@/models/notifier";
import { options } from "@/models/options";
import { announcements } from "@/models/announcements";
import { playableCards } from "@/models/playableCardFinder";
import { Memory, PerfectMemory } from "./memory";
import { Card } from "./card";
import { Trick } from "./trick";

const notifier = new Notifier();

export class Player {
  id: string;
  name: string;
  hand: Hand;
  trickStack: TrickStack = new TrickStack();
  announcements: Set<string> = new Set();
  isHuman: boolean;
  isMe: boolean;
  tablePosition: string;
  game: any;
  behavior: Behavior;
  memory: Memory;

  constructor(
    name: string,
    isHuman = false,
    isMe = false,
    tablePosition = "bottom", // todo: remove 'position', introduce new 'table view' class?
    game = {},
    behaviour = new RuleBasedBehaviour(),
    memory = new PerfectMemory()
  ) {
    this.id = uniqueId("player_");
    this.name = name;
    this.hand = new Hand();
    this.isHuman = isHuman;
    this.isMe = isMe;
    this.tablePosition = tablePosition;
    this.game = game;
    this.behavior = behaviour;
    this.memory = memory;

    this.reset();
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
      this.game.currentTrick,
      this.memory
    );
    if (cardToBePlayed) {
      this.play(cardToBePlayed);
    }

    const announcement = this.behavior.announcementToMake(
      this.possibleAnnouncements()
    );
    if (announcement !== null) {
      this.announce(announcement);
    }
  }

  play(card: Card) {
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

    try {
      this.game.currentTrick.add(cardToBePlayed, this);
      this.hand.remove(cardToBePlayed);
      console.debug(`Player ${this.name} played: ${cardToBePlayed.cardId}`);
      this.game.currentRound.nextPlayer();

      if (options.autoplay === true) {
        // timeout to accommodate for animation duration when playing a card
        setTimeout(() => this.game.currentRound.nextMove(), 800);
      }
    } catch (error) {
      if (this.isHuman) {
        notifier.info("not-your-turn");
        return;
      }
    }
  }

  numberOfCardsLeft() {
    return this.hand.cards.length;
  }

  canPlay(card: Card) {
    const baseCard = this.game.currentTrick.baseCard();
    const playable = playableCards(this.hand.cards, baseCard);
    return includes(playable, card);
  }

  win(trick: Trick) {
    this.trickStack.add(trick);
  }

  reset() {
    this.trickStack = new TrickStack();
    this.announcements = new Set();
  }

  points() {
    return this.trickStack.points();
  }

  announce(announcement: string) {
    if (![...this.possibleAnnouncements()].includes(announcement)) {
      throw new Error("Invalid announcement");
    }

    // always announce re/kontra
    let allAnnouncements = this.isRe()
      ? [announcements.re]
      : [announcements.kontra];

    if (announcement === announcements.no_60) {
      allAnnouncements.push(announcements.no_90);
    }

    if (announcement === announcements.no_30) {
      allAnnouncements.push(announcements.no_90);
      allAnnouncements.push(announcements.no_60);
    }

    if (announcement === announcements.no_points) {
      allAnnouncements.push(announcements.no_90);
      allAnnouncements.push(announcements.no_60);
      allAnnouncements.push(announcements.no_30);
    }

    // finally, add the actual announement
    allAnnouncements.push(announcement);

    allAnnouncements.forEach(a => this.announcements.add(a));
    this.announcements = new Set(allAnnouncements);
    notifier.info("player-announced-" + announcement, { name: this.name });
  }

  hasAnnounced(...announcements: string[]) {
    return announcements.every(a => [...this.announcements].includes(a));
  }

  // todo: make this configurable for playing with 9s (add 2 to each threshold)
  possibleAnnouncements() {
    const cardsLeft = this.numberOfCardsLeft();

    if (cardsLeft < 4) {
      return new Set<string>();
    }

    const winningAnnouncement = this.isRe()
      ? announcements.re
      : announcements.kontra;

    if (cardsLeft >= 9) {
      return this._removeExisting([
        winningAnnouncement,
        announcements.no_90,
        announcements.no_60,
        announcements.no_30,
        announcements.no_points
      ]);
    }

    if (cardsLeft >= 8 && this.hasAnnounced(winningAnnouncement)) {
      return this._removeExisting([
        announcements.no_90,
        announcements.no_60,
        announcements.no_30,
        announcements.no_points
      ]);
    }

    if (
      cardsLeft >= 7 &&
      this.hasAnnounced(winningAnnouncement, announcements.no_90)
    ) {
      return this._removeExisting([
        announcements.no_60,
        announcements.no_30,
        announcements.no_points
      ]);
    }

    if (
      cardsLeft >= 6 &&
      this.hasAnnounced(
        winningAnnouncement,
        announcements.no_90,
        announcements.no_60
      )
    ) {
      return this._removeExisting([
        announcements.no_30,
        announcements.no_points
      ]);
    }

    if (
      cardsLeft >= 5 &&
      this.hasAnnounced(
        winningAnnouncement,
        announcements.no_90,
        announcements.no_60,
        announcements.no_30
      )
    ) {
      return this._removeExisting([announcements.no_points]);
    }

    return new Set<string>();
  }

  _removeExisting(possibleAnnouncements: string[]) {
    return new Set(
      possibleAnnouncements.filter(a => ![...this.announcements].includes(a))
    );
  }
}
