import {
  BasicRuleBasedBehaviour,
  HighestCardBehavior,
  RandomCardBehavior
} from "@/models/behaviors";
import { Hand } from "@/models/hand";
import { announcements } from "@/models/announcements";
import { ace, king, queen, jack, suits, ten, Card } from "@/models/card";
import { Trick } from "@/models/trick";
import { Player } from "@/models/player";
import { PerfectMemory } from "@/models/memory";
import { PlayedCard } from "@/models/playedCard";

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
  const player = new Player();
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
  const player = new Player();
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

const behavior = new BasicRuleBasedBehaviour();
const no_memory = new PerfectMemory();
const player1 = new Player();
const player2 = new Player();
const player3 = new Player();
const player4 = new Player();
const hand = new Hand([
  ten.of(suits.hearts).first(),
  jack.of(suits.diamonds).first(),
  ace.of(suits.diamonds).first(),
  king.of(suits.diamonds).first(),
  ace.of(suits.clubs).first(),
  ten.of(suits.clubs).first(),
  king.of(suits.clubs).first(),
  ace.of(suits.spades).first(),
  ace.of(suits.spades).second(),
  ten.of(suits.spades).first(),
  king.of(suits.spades).first()
]);

describe("Basic Rule Based Card Behavior", () => {
  describe("Fehl has been played for the first time", () => {
    test("should play lowest value fehl when not starting", () => {
      const trick = new Trick([player1, player2, player3, player4]);
      trick.add(ace.of(suits.clubs).second(), player1);
      trick.add(ten.of(suits.clubs).second(), player2);
      trick.add(king.of(suits.clubs).second(), player3);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(king.of(suits.clubs).first());
    });

    test("should play ace of suit, when first time served and lower card was played", () => {
      const trick = new Trick([player1, player2, player3, player4]);
      trick.add(ten.of(suits.clubs).second(), player1);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(ace.of(suits.clubs).first());
    });

    test("should play lowest of suit, when first time served and not able to go higher", () => {
      let hand = new Hand([king.of(suits.clubs).first(), ten.of(suits.clubs)]);
      const trick = new Trick([player1, player2, player3, player4]);
      trick.add(ten.of(suits.clubs).second(), player1);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(king.of(suits.clubs).first());
    });

    test("should play ace, when mustn't serve", () => {
      const trick = new Trick([player1, player2, player3, player4]);
      trick.add(ace.of(suits.hearts).second(), player1);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(ace.of(suits.diamonds).first());
    });

    test("should play higher trump when mustn't serve and somebody else is trumping", () => {
      const trick = new Trick([player1, player2, player3, player4]);
      trick.add(ace.of(suits.hearts).second(), player1);
      trick.add(ten.of(suits.diamonds).second(), player2);
      trick.add(ace.of(suits.diamonds).second(), player3);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(jack.of(suits.diamonds).first());
    });

    test("should play jack, when mustn't serve and high value card isn't available", () => {
      let hand = new Hand([
        king.of(suits.diamonds),
        jack.of(suits.diamonds).first(),
        ten.of(suits.hearts)
      ]);
      const trick = new Trick([player1, player2, player3, player4]);
      trick.add(ace.of(suits.hearts).second(), player1);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(jack.of(suits.diamonds).first());
    });

    test("should play lowest card, when can't win because too many cards of suit in own hand", () => {
      const trick = new Trick([player1, player2, player3, player4]);
      trick.add(king.of(suits.spades).second(), player1);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(king.of(suits.spades).first());
    });

    test("should keep playing a card, if can't serve or trump a suit", () => {
      let hand = new Hand([king.of(suits.spades), ten.of(suits.spades)]);
      const trick = new Trick([player1, player2, player3, player4]);
      trick.add(ace.of(suits.hearts).second(), player1);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(expect.any(Card));
    });

    test("should keep playing a card, if can't win a trumped suit", () => {
      let hand = new Hand([jack.of(suits.spades), ten.of(suits.spades)]);
      const trick = new Trick([player1, player2, player3, player4]);
      trick.add(ace.of(suits.hearts).second(), player1);
      trick.add(jack.of(suits.spades).second(), player2);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(expect.any(Card));
    });
  });

  describe("Fehl has been played already", () => {
    test("should keep playing a card, if can't play same suit", () => {
      let hand = new Hand([jack.of(suits.spades), ten.of(suits.diamonds)]);
      let memory = new PerfectMemory();
      const trick = new Trick([player1, player2, player3, player4]);
      const aceOfClubs = ace.of(suits.clubs).second();
      const jackOfDiamonds = jack.of(suits.diamonds).second();
      trick.add(aceOfClubs, player1);
      memory.memorize(aceOfClubs, player1);
      trick.add(jackOfDiamonds, player2);
      memory.memorize(jackOfDiamonds, player2);
      const cardToPlay = behavior.cardToPlay(hand, trick, memory);
      expect(cardToPlay).toEqual(expect.any(Card));
    });

    test("should play low card, if must serve suit", () => {
      let hand = new Hand([ace.of(suits.clubs), king.of(suits.clubs).first()]);
      let memory = new PerfectMemory();
      const trick = new Trick([player1, player2, player3, player4]);
      const aceOfClubs = ace.of(suits.clubs).second();
      const jackOfDiamonds = jack.of(suits.diamonds).second();
      trick.add(aceOfClubs, player1);
      memory.memorize(new PlayedCard(aceOfClubs, player1));
      trick.add(jackOfDiamonds, player2);
      memory.memorize(new PlayedCard(jackOfDiamonds, player2));
      const cardToPlay = behavior.cardToPlay(hand, trick, memory);
      expect(cardToPlay).toEqual(king.of(suits.clubs).first());
    });
  });
});
