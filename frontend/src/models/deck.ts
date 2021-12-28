import {
  ace,
  Card,
  compareSuites,
  defaultCardOrder,
  defaultTrumps,
  king,
  nine,
  Rank,
  Suit,
  ten
} from "@/models/card";
import { shuffle } from "@/models/random";
import { RoundRules } from "@/models/rules";

export class Deck {
  cards: Card[];
  rules: RoundRules[] | undefined;

  constructor(rules?: RoundRules[]) {
    this.cards = shuffle(new Array<Card>().concat(...allCards));
    this.refreshRules(rules);
  }

  refreshRules(rules?: RoundRules[]) {
    if (rules?.includes(RoundRules.SHARP_DOKO)) {
      this.cards = this.cards.filter(card => card.rank !== Rank.Nine);
    }
    this.cards.forEach(card => {
      card.trumps = defaultTrumps!;
      card.cardOrder = defaultCardOrder;
      if (rules?.includes(RoundRules.JACK_SOLO)) {
        card.trumps = this.buildRankSoloTrumps(Rank.Jack);
        card.cardOrder = [...this.cards].sort(this.compareRankSolo(Rank.Jack));
      }
      if (rules?.includes(RoundRules.QUEEN_SOLO)) {
        card.trumps = this.buildRankSoloTrumps(Rank.Queen);
        card.cardOrder = [...this.cards].sort(this.compareRankSolo(Rank.Queen));
      }
      if (rules?.includes(RoundRules.HEARTS_SOLO)) {
        card.trumps = this.buildSuitSoloTrumps(Suit.Hearts);
        card.cardOrder = [
          ...this.buildSuitDoubleSoloTrumps(Suit.Hearts),
          ...this.buildNonTrumpOrder(Suit.Hearts)
        ];
      }
      if (rules?.includes(RoundRules.SPADES_SOLO)) {
        card.trumps = this.buildSuitSoloTrumps(Suit.Spades);
        card.cardOrder = [
          ...this.buildSuitDoubleSoloTrumps(Suit.Spades),
          ...this.buildNonTrumpOrder(Suit.Spades)
        ];
      }
      if (rules?.includes(RoundRules.CLUBS_SOLO)) {
        card.trumps = this.buildSuitSoloTrumps(Suit.Clubs);
        card.cardOrder = [
          ...this.buildSuitDoubleSoloTrumps(Suit.Clubs),
          ...this.buildNonTrumpOrder(Suit.Clubs)
        ];
      }
      if (rules?.includes(RoundRules.PIGGIES)) {
        this.moveToFront(ace.of(Suit.Diamonds).second());
        this.moveToFront(ace.of(Suit.Diamonds).first());
      }
      if (rules?.includes(RoundRules.NO_TRUMPS)) {
        card.trumps = [];
        card.cardOrder = [...this.cards].sort(this.compareRankSolo());
      }
    });
  }

  private compareRankSolo = (rank?: Rank) => (
    oneCard: Card,
    anotherCard: Card
  ) => {
    if (oneCard.rank === rank && anotherCard.rank !== rank) {
      return -1;
    }
    if (oneCard.rank !== rank && anotherCard.rank === rank) {
      return 1;
    }
    if (oneCard.rank === rank && oneCard.rank === anotherCard.rank) {
      return compareSuites(oneCard.suit, anotherCard.suit);
    }
    if (oneCard.rank !== rank && anotherCard.rank !== rank) {
      if (oneCard.suit === anotherCard.suit) {
        return anotherCard.value - oneCard.value;
      }
    }
    return compareSuites(oneCard.suit, anotherCard.suit);
  };

  private buildNonTrumpOrder(except: Suit) {
    return [Suit.Clubs, Suit.Spades, Suit.Hearts, Suit.Diamonds]
      .filter(suit => suit !== except)
      .map(suit => [
        ace.of(suit),
        ...(suit === Suit.Hearts ? [] : [ten.of(suit)]),
        king.of(suit),
        nine.of(suit)
      ])
      .flat()
      .map(c => [c.first(), c.second()])
      .flat();
  }

  private buildRankSoloTrumps(rank: Rank) {
    return [...this.cards]
      .filter(card => card.rank === rank && card.id === 0)
      .sort((a, b) => {
        return compareSuites(b.suit, a.suit);
      })
      .reverse();
  }

  private buildSuitSoloTrumps(suit: Suit) {
    return [
      ...defaultTrumps.slice(0, -4),
      ace.of(suit).first(),
      ...(suit === Suit.Hearts ? [] : [ten.of(suit).first()]),
      king.of(suit).first(),
      nine.of(suit).first()
    ];
  }

  private buildSuitDoubleSoloTrumps(suit: Suit) {
    return this.buildSuitSoloTrumps(suit)
      .map(c => [c.first(), c.second()])
      .flat();
  }

  private moveToFront(card: Card) {
    const first = card.cardOrder.findIndex(c => c.equals(card));
    const spliced = card.cardOrder.splice(first, 1)[0];
    card.cardOrder.splice(0, 0, spliced);
    const index = card.trumps.findIndex(c => c.is(card));
    const cut = card.trumps.splice(index, 1)[0];
    card.trumps.splice(0, 0, cut);
  }
}

export const allCards = Object.values(Rank)
  .map(rank => [
    new Card(rank, Suit.Clubs, 0),
    new Card(rank, Suit.Spades, 0),
    new Card(rank, Suit.Hearts, 0),
    new Card(rank, Suit.Diamonds, 0),
    new Card(rank, Suit.Clubs, 1),
    new Card(rank, Suit.Spades, 1),
    new Card(rank, Suit.Hearts, 1),
    new Card(rank, Suit.Diamonds, 1)
  ])
  .flat();
