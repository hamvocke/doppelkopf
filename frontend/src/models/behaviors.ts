import { sample } from "lodash-es";
import { playableCards } from "@/models/playableCardFinder";
import { chance } from "@/models/random";
import { Card, Suit, Rank, byCardValuesDesc, ten } from "@/models/card";
import { Hand } from "@/models/hand";
import { Announcement } from "./announcements";
import { Trick } from "./trick";
import { Memory } from "./memory";
import { Player } from "./player";
import { Affinities } from "./affinities";

export interface Behavior {
  playerId: string;
  affinities: Affinities;
  reset(): void;
  cardToPlay(hand: Hand, trick: Trick, memory?: Memory): Card;
  announcementToMake(
    possibleAnnouncements: Set<Announcement>
  ): Announcement | null;
}

export class HighestCardBehavior implements Behavior {
  constructor(public playerId: string, public affinities: Affinities) {}

  reset() {
    this.affinities.reset();
  }

  cardToPlay(hand: Hand, trick: Trick, memory?: Memory) {
    return playableCards(hand.cards, trick.baseCard())[0];
  }

  announcementToMake(possibleAnnouncements: Set<Announcement>) {
    return null;
  }
}
export class RandomCardBehavior implements Behavior {
  constructor(public playerId: string, public affinities: Affinities) {}

  reset() {
    this.affinities.reset();
  }

  cardToPlay(hand: Hand, trick: Trick, memory?: Memory) {
    return sample(playableCards(hand.cards, trick.baseCard()))!;
  }

  announcementToMake(possibleAnnouncements: Set<Announcement>) {
    if (possibleAnnouncements.size === 0) {
      return null;
    }

    const announcementChance = 0.1;
    if (chance(announcementChance)) {
      return [...possibleAnnouncements][0];
    }

    return null;
  }
}

export class RuleBasedBehaviour implements Behavior {
  constructor(public playerId: string, public affinities: Affinities) {}

  reset() {
    this.affinities.reset();
  }

  announcementToMake(possibleAnnouncements: Set<Announcement>) {
    // ToDo announce by "goodies"
    /**
     * for instance
     * only one nonTrumpsuit
     * high number of trumps
     * high trumps, such as 2x ten of hearts
     * blank ace and starting
     */
    return null;
  }

  cardToPlay(hand: Hand, trick: Trick, memory?: Memory): Card {
    let baseCard = trick.baseCard();
    // Teammate will win trick no matter what
    if (this.teammateWinsTrick(trick, hand, memory))
      return this.findMostSuitableGreasingCard(hand, trick);

    if (trick.cards().length == 3) {
      return this.playPosition(hand, trick);
    }

    // You're not able to win the trick on your own no matter what
    if (this.trickCannotBeWon(hand, trick, memory))
      return this.findLeastValuableLosingCard(hand, trick);

    if (!baseCard) {
      /** It's our turn. Decide how to deal with cards */
      return this.startingRule(hand, trick, memory);
    }
    if (!baseCard.isTrump()) {
      return this.nonTrumpRule(hand, trick, memory);
    }
    // ToDo how to play if not starting or mustn't serve nonTrump
    // i'm thinking of something working with expectation value
    return sample(playableCards(hand.cards, baseCard))!;
  }

  startingRule(hand: Hand, trick: Trick, memory?: Memory): Card {
    for (const ace of hand.getBlankAces()) {
      if (!memory?.nonTrumpSuitPlayedBefore(ace.suit)) {
        return ace;
      }
    }
    for (const suit of [Suit.Clubs, Suit.Spades, Suit.Hearts]) {
      if (
        hand.findAny(suit, Rank.Ace) &&
        !memory?.nonTrumpSuitPlayedBefore(suit) &&
        hand.nonTrumps(suit).length <= 3
      ) {
        return hand.nonTrumps(suit)[0];
      }
    }
    // ToDo check if we know with whom we play and if we want to play a strategy
    if (this.getMyPlayer(trick).isKontra()) {
      return this.findLeastValuableLosingCard(hand, trick);
    } else {
      return (
        hand
          .lowValues()
          .filter(card => card.isTrump())
          .reverse()[0] ?? this.findLeastValuableLosingCard(hand, trick)
      );
    }
  }

  nonTrumpRule(hand: Hand, trick: Trick, memory?: Memory): Card {
    let baseCard = trick.baseCard()!;
    if (hand.hasNonTrumps(baseCard.suit)) {
      return this.serveNonTrump(hand, trick, memory);
    } else {
      if (memory?.nonTrumpSuitPlayedBefore(baseCard.suit, trick.id!)) {
        return hand.highest().beats(trick.highestCard()!.card) &&
          // ToDo this check works but needs tuning
          memory.pointsLeftInSuit(baseCard.suit) + trick.points() >= 14
          ? hand.trumps()[0]
          : this.playLowValueCard(hand, trick);
      } else {
        let usefulTrump = this.findMostValuableWinningTrump(hand, trick);
        return usefulTrump ?? this.playLowValueCard(hand, trick);
      }
    }
  }

  playLowValueCard(hand: Hand, trick: Trick): Card {
    if (playableCards(hand.lowValues(), trick.baseCard()).length > 0) {
      let nonTrumpLows = new Hand(hand.nonTrumps()).lowValues();
      return nonTrumpLows.length > 0
        ? sample(playableCards(nonTrumpLows, trick.baseCard()))!
        : new Hand(hand.trumps()).lowValues().splice(-1)[0];
    } else {
      return sample(playableCards(hand.cards, trick.baseCard()))!;
    }
  }

  playPosition(hand: Hand, trick: Trick): Card {
    if (this.isTeammateKnown() && this.isCurrentWinnerTeammate(trick)) {
      return this.findMostSuitableGreasingCard(hand, trick);
    }
    let winningTrump = this.findMostValuableWinningTrump(
      new Hand(playableCards(hand.cards, trick.baseCard()!)),
      trick
    );
    if (winningTrump) {
      if (trick.points() >= 14 || winningTrump.value <= 3) {
        return winningTrump;
      }
    }
    return this.findLeastValuableLosingCard(hand, trick);
  }

  teammateWinsTrick(trick: Trick, hand: Hand, memory?: Memory): Boolean {
    return (
      this.isTeammateKnown() &&
      this.isCurrentWinnerTeammate(trick) &&
      !!memory?.isHighestCardLeft(trick.highestCard()!.card, hand)
    );
  }

  trickCannotBeWon(hand: Hand, trick: Trick, memory?: Memory): Boolean {
    return (
      !!trick.baseCard()?.isTrump() &&
      (!hand.highest().beats(trick.highestCard()!.card) ||
        !!memory?.isHighestCardLeft(trick.highestCard()!.card))
    );
  }

  private isTeammateKnown(): Boolean {
    return (
      this.affinities.affinityTable.filter(
        playerAffinity => playerAffinity.affinity === 1
      ).length > 0
    );
  }

  private isCurrentWinnerTeammate(trick: Trick): Boolean {
    return (
      trick.highestCard()?.player.isRe() === this.getMyPlayer(trick)?.isRe()
    );
  }

  private getMyPlayer(trick: Trick): Player {
    return trick.players.find(player => player.id === this.playerId)!;
  }

  serveNonTrump(hand: Hand, trick: Trick, memory?: Memory): Card {
    let nonTrumpCards = hand.nonTrumps(trick.baseCard()!.suit);
    let highest = nonTrumpCards[0];
    let lowest = nonTrumpCards.slice(-1)[0];

    if (memory?.nonTrumpSuitPlayedBefore(trick.baseCard()!.suit, trick.id)) {
      return lowest;
    }

    if (
      highest.beats(trick.highestCard()!.card) &&
      highest.rank === Rank.Ace &&
      // TODO trick.expectedNumberOfCards needs to change as soon as 9er game is possible
      nonTrumpCards.length < trick.players.length
    ) {
      return highest;
    }

    return lowest;
  }

  /**
   * Find a card on a given hand that will add as much value as suitable.
   * Will prefer non-trumps over trumps.
   * Fox is most important though.
   * Will only grease with ten of hearts if only possibility
   * @param {Hand} hand - The hand to find the card on
   * @param {Trick} trick - The trick that should be greased
   * @returns {Card} - The most suitable greasing card that can be found
   */
  findMostSuitableGreasingCard(hand: Hand, trick?: Trick): Card {
    const fox = hand.findAny(Suit.Diamonds, Rank.Ace);
    const tenOfHearts = hand.findAny(Suit.Hearts, Rank.Ten);
    const queens = hand.cards.filter(card => card.rank == Rank.Queen).reverse();

    const cardPreference = [
      fox!,
      ...hand.cards
        .sort(byCardValuesDesc)
        .filter(
          card =>
            card.compareTo(ten.of(Suit.Hearts)) != 0 && card.rank != Rank.Queen
        ),
      ...queens,
      tenOfHearts!
    ].filter(Boolean);

    return playableCards(cardPreference, trick?.baseCard())[0];
  }

  /**
   * Find a trump on a given hand that will win the given trick at this point in time.
   * Will prefer high-value trumps (ace of diamonds, ten of diamonds) if possible.
   * Otherwise it will fall back to the lowest trump possible.
   * @param {Hand} hand - The hand to find the trump on
   * @param {Trick} trick - The trick that should be trumped
   * @returns {Card} - The most valuable trump card or null if no winning trump can be found
   */
  findMostValuableWinningTrump(hand: Hand, trick: Trick): Card | null {
    const highestCard = trick.highestCard()!.card;

    const aceOfDiamonds = hand.findAny(Suit.Diamonds, Rank.Ace);
    const tenOfDiamonds = hand.findAny(Suit.Diamonds, Rank.Ten);

    const trumpPreference = [
      aceOfDiamonds,
      tenOfDiamonds,
      ...hand.trumps().reverse()
    ];

    return (
      trumpPreference.find(card => card && card.beats(highestCard)) ?? null
    );
  }

  /**
   * Find a card on a given hand that will add as less value as possible.
   * Will prefer jacks before tens and aces.
   * @param {Hand} hand - The hand to find the trump on
   * @param {Trick} trick - The trick that should be trumped
   * @returns {Card} - The least valuable card that can be found
   */
  findLeastValuableLosingCard(hand: Hand, trick: Trick): Card {
    const cardPreference = [
      ...hand.nonTrumps().filter(card => card.value === 4),
      ...hand.lowValues().filter(card => card.value !== 3),
      ...hand.cards.reverse()
    ];
    return playableCards(cardPreference, trick.baseCard())[0];
  }
}
