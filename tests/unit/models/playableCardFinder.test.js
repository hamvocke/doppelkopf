import { playableCards } from "@/models/playableCardFinder";
import { ace, queen, suits, ten } from "@/models/card";

describe("Playable Card Finder", () => {
  test("should highlight matching non-trumps only when player needs to serve", () => {
    const baseCard = ace.of(suits.spades);
    const matchingNonTrump = ten.of(suits.spades);
    const cards = [
      queen.of(suits.spades),
      ten.of(suits.diamonds),
      queen.of(suits.diamonds),
      matchingNonTrump
    ];

    const foundCards = playableCards(cards, baseCard);

    expect(foundCards).toEqual([matchingNonTrump]);
  });

  test("should highlight trumps only when player needs to serve trump", () => {
    const baseCard = ace.of(suits.diamonds);
    const trumps = [
      ten.of(suits.hearts),
      queen.of(suits.clubs),
      ten.of(suits.diamonds)
    ];
    const cards = [...trumps, ace.of(suits.clubs), ten.of(suits.spades)];

    const foundCards = playableCards(cards, baseCard);

    expect(foundCards).toEqual(expect.arrayContaining(trumps));
  });

  test("should highlight all cards when no base card is defined", () => {
    const baseCard = undefined;
    const cards = [
      ace.of(suits.clubs),
      ten.of(suits.spades),
      queen.of(suits.diamonds)
    ];

    const foundCards = playableCards(cards, baseCard);

    expect(foundCards).toEqual(cards);
  });

  test("should highlight all cards when player cannot serve non-trump", () => {
    const baseCard = ten.of(suits.spades);
    const cards = [
      queen.of(suits.diamonds),
      ace.of(suits.diamonds),
      ace.of(suits.clubs)
    ];

    const foundCards = playableCards(cards, baseCard);

    expect(foundCards).toEqual(cards);
  });

  test("should highlight all cards when player cannot serve trump", () => {
    const baseCard = ten.of(suits.hearts);
    const cards = [ace.of(suits.spades), ace.of(suits.clubs)];

    const foundCards = playableCards(cards, baseCard);

    expect(foundCards).toEqual(cards);
  });
});
