import { HighestCardBehavior, RandomCardBehavior } from "@/models/behaviors";
import { Hand } from "@/models/hand";
import { announcements } from "@/models/announcements";
import { ace, king, queen, jack, suits, ten, Card } from "@/models/card";
import { Trick } from "@/models/trick";
import { Player } from "@/models/player";

jest.mock("@/models/random", () => ({
  __esModule: true,
  chance: () => true
}));

describe("Highest Card Behavior", () => {
  const behavior = new HighestCardBehavior();
  const hand = new Hand([
    ace.of(suits.hearts).first(),
    jack.of(suits.clubs).first(),
    queen.of(suits.spades).second(),
    king.of(suits.hearts).first()
  ]);
  const player = new Player(new Player());
  const trick = new Trick([player]);
  trick.add(ten.of(suits.diamonds), player);

  test("should play highest possible card", () => {
    const cardToPlay = behavior.cardToPlay(hand, trick);
    expect(cardToPlay).toEqual(queen.of(suits.spades).second());
  });
});

describe("Random Card Behavior", () => {
  const behavior = new RandomCardBehavior();
  const hand = new Hand([
    ace.of(suits.hearts).first(),
    jack.of(suits.clubs).first(),
    queen.of(suits.spades).second(),
    king.of(suits.hearts).first()
  ]);
  const player = new Player(new Player());
  const trick = new Trick([player]);
  trick.add(ten.of(suits.diamonds), player);

  test("should play a random card", () => {
    const cardToPlay = behavior.cardToPlay(hand, trick);
    expect(cardToPlay).toEqual(expect.any(Card));
  });

  test("should make an announcement by chance", () => {
    const possibleAnnouncements = new Set([
      announcements.re,
      announcements.no_90
    ]);

    const announcement = behavior.announcementToMake(possibleAnnouncements);

    expect(announcement).toEqual(announcements.re);
  });

  test("should return null if no announcement possible", () => {
    const announcement = behavior.announcementToMake(new Set());

    expect(announcement).toBe(null);
  });
});
