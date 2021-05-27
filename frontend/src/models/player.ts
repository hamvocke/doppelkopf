import { includes, uniqueId } from "lodash-es";
import { Hand } from "@/models/hand";
import { TrickStack } from "@/models/trickStack";
import { Behavior, RuleBasedBehaviour } from "@/models/behaviors";
import { Notifier } from "./notifier";
import { options } from "./options";
import { Announcement } from "./announcements";
import { playableCards } from "./playableCardFinder";
import { Memory, PerfectMemory } from "./memory";
import { Card, Suit, queen } from "./card";
import { Trick } from "./trick";
import { Game } from "./game";
import { TablePosition } from "./tablePosition";
import { Affinities, AffinityEvent } from "@/models/affinities";
import { generateNames } from "@/models/random";

const notifier = new Notifier();

// TODO: break circular dependency between player & game, make game non-null
export class Player {
  id: string;
  remoteId?: number;
  name: string;
  hand: Hand;
  trickStack: TrickStack = new TrickStack();
  announcements: Set<Announcement> = new Set();
  isHuman: boolean;
  isMe: boolean;
  tablePosition: string;
  game?: Game;
  behavior: Behavior;
  memory: Memory;
  affinities: Affinities;

  constructor(
    name: string,
    isHuman = false,
    isMe = false,
    tablePosition = TablePosition.Bottom,
    game?: Game,
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
    this.affinities = new Affinities(this);

    this.reset();
  }

  static me(name?: string): Player {
    let playerName = name || generateNames(1)[0];
    // todo: set multiplayer behavior here
    return new Player(playerName, true, true, TablePosition.Bottom);
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
      this.game?.currentTrick,
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
    if (this.game?.currentRound.waitingForPlayer() !== this) {
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

      if (card.compareTo(queen.of(Suit.Clubs)) === 0)
        this.game.affinityEvent(AffinityEvent.QueenOfClubs, this);

      console.debug(`Player ${this.name} played: ${cardToBePlayed.cardId}`);
      this.game.currentRound.nextPlayer();

      if (options.autoplay === true) {
        // timeout to accommodate for animation duration when playing a card
        setTimeout(() => this.game?.currentRound.nextMove(), 800);
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
    const baseCard = this.game?.currentTrick.baseCard();
    const playable = playableCards(this.hand.cards, baseCard);
    return includes(playable, card);
  }

  win(trick: Trick) {
    this.trickStack.add(trick);
  }

  reset() {
    this.trickStack = new TrickStack();
    this.announcements = new Set();
    this.memory.clearMemory();
    this.affinities.reset();
  }

  points() {
    return this.trickStack.points();
  }

  announce(announcement: Announcement) {
    if (![...this.possibleAnnouncements()].includes(announcement)) {
      throw new Error("Invalid announcement");
    }

    this.game?.affinityEvent(AffinityEvent.Announcement, this);

    // always announce re/kontra
    let allAnnouncements = this.isRe()
      ? [Announcement.Re]
      : [Announcement.Kontra];

    if (announcement === Announcement.No60) {
      allAnnouncements.push(Announcement.No90);
    }

    if (announcement === Announcement.No30) {
      allAnnouncements.push(Announcement.No90);
      allAnnouncements.push(Announcement.No60);
    }

    if (announcement === Announcement.NoPoints) {
      allAnnouncements.push(Announcement.No90);
      allAnnouncements.push(Announcement.No60);
      allAnnouncements.push(Announcement.No30);
    }

    // finally, add the actual announement
    allAnnouncements.push(announcement);

    allAnnouncements.forEach(a => this.announcements.add(a));
    this.announcements = new Set(allAnnouncements);
    notifier.info("player-announced-" + announcement, { name: this.name });
  }

  hasAnnounced(...announcements: Announcement[]) {
    return announcements.every(a => [...this.announcements].includes(a));
  }

  // todo: make this configurable for playing with 9s (add 2 to each threshold)
  possibleAnnouncements(): Set<Announcement> {
    const cardsLeft = this.numberOfCardsLeft();

    if (cardsLeft < 4) {
      return new Set<Announcement>();
    }

    const winningAnnouncement = this.isRe()
      ? Announcement.Re
      : Announcement.Kontra;

    if (cardsLeft >= 9) {
      return this._removeExisting([
        winningAnnouncement,
        Announcement.No90,
        Announcement.No60,
        Announcement.No30,
        Announcement.NoPoints
      ]);
    }

    if (cardsLeft >= 8 && this.hasAnnounced(winningAnnouncement)) {
      return this._removeExisting([
        Announcement.No90,
        Announcement.No60,
        Announcement.No30,
        Announcement.NoPoints
      ]);
    }

    if (
      cardsLeft >= 7 &&
      this.hasAnnounced(winningAnnouncement, Announcement.No90)
    ) {
      return this._removeExisting([
        Announcement.No60,
        Announcement.No30,
        Announcement.NoPoints
      ]);
    }

    if (
      cardsLeft >= 6 &&
      this.hasAnnounced(
        winningAnnouncement,
        Announcement.No90,
        Announcement.No60
      )
    ) {
      return this._removeExisting([Announcement.No30, Announcement.NoPoints]);
    }

    if (
      cardsLeft >= 5 &&
      this.hasAnnounced(
        winningAnnouncement,
        Announcement.No90,
        Announcement.No60,
        Announcement.No30
      )
    ) {
      return this._removeExisting([Announcement.NoPoints]);
    }

    return new Set<Announcement>();
  }

  _removeExisting(possibleAnnouncements: Announcement[]) {
    return new Set(
      possibleAnnouncements.filter(a => ![...this.announcements].includes(a))
    );
  }
}
