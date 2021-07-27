import {
  RuleBasedBehaviour,
  HighestCardBehavior,
  RandomCardBehavior
} from "@/models/behaviors";
import { Hand } from "@/models/hand";
import { Announcement } from "@/models/announcements";
import { ace, king, queen, jack, Suit, ten, Card } from "@/models/card";
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
    ace.of(Suit.Hearts).first(),
    jack.of(Suit.Clubs).first(),
    queen.of(Suit.Spades).second(),
    king.of(Suit.Hearts).first()
  ]);
  const player = new Player("some player");
  const trick = new Trick([player]);
  trick.add(ten.of(Suit.Diamonds), player);

  test("should play highest possible card", () => {
    const cardToPlay = behavior.cardToPlay(hand, trick, null);
    expect(cardToPlay).toEqual(queen.of(Suit.Spades).second());
  });
});

describe("Random Card Behavior", () => {
  const behavior = new RandomCardBehavior();
  const hand = new Hand([
    ace.of(Suit.Hearts).first(),
    jack.of(Suit.Clubs).first(),
    queen.of(Suit.Spades).second(),
    king.of(Suit.Hearts).first()
  ]);
  const player = new Player("some player");
  const trick = new Trick([player]);
  trick.add(ten.of(Suit.Diamonds), player);

  test("should play a random card", () => {
    const cardToPlay = behavior.cardToPlay(hand, trick, null);
    expect(cardToPlay).toEqual(expect.any(Card));
  });

  test("should make an announcement by chance", () => {
    const possibleAnnouncements = new Set([Announcement.Re, Announcement.No90]);

    const announcement = behavior.announcementToMake(possibleAnnouncements);

    expect(announcement).toEqual(Announcement.Re);
  });

  test("should return null if no announcement possible", () => {
    const announcement = behavior.announcementToMake(new Set());

    expect(announcement).toBe(null);
  });
});

describe("Rule Based Card Behavior", () => {
  const behavior = new RuleBasedBehaviour();
  const no_memory = new PerfectMemory();
  const player1 = new Player("p1");
  const player2 = new Player("p2");
  const player3 = new Player("p3");
  const player4 = new Player("p4");
  const players = [player1, player2, player3, player4];
  const hand = new Hand([
    ten.of(Suit.Hearts).first(),
    jack.of(Suit.Diamonds).first(),
    ace.of(Suit.Diamonds).first(),
    king.of(Suit.Diamonds).first(),
    ace.of(Suit.Clubs).first(),
    ten.of(Suit.Clubs).first(),
    king.of(Suit.Clubs).first(),
    ace.of(Suit.Spades).first(),
    ace.of(Suit.Spades).second(),
    ten.of(Suit.Spades).first(),
    king.of(Suit.Spades).first()
  ]);

  describe("Non-trump has been played for the first time", () => {
    beforeEach(() => {
      player1.memory.clearMemory();
      player2.memory.clearMemory();
      player3.memory.clearMemory();
      player4.memory.clearMemory();
    });
    test("should play lowest value nonTrump when not starting", () => {
      const trick = new Trick(players);
      trick.add(ace.of(Suit.Clubs).second(), player1);
      trick.add(ten.of(Suit.Clubs).second(), player2);
      trick.add(king.of(Suit.Clubs).second(), player3);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(king.of(Suit.Clubs).first());
    });

    test("should play ace of suit, when first time served and lower card was played", () => {
      const trick = new Trick(players);
      trick.add(ten.of(Suit.Clubs).second(), player1);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(ace.of(Suit.Clubs).first());
    });

    test("should play lowest of suit, when first time served and not able to go higher", () => {
      let hand = new Hand([king.of(Suit.Clubs).first(), ten.of(Suit.Clubs)]);
      const trick = new Trick(players);
      trick.add(ten.of(Suit.Clubs).second(), player1);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(king.of(Suit.Clubs).first());
    });

    test("should play ace, when mustn't serve", () => {
      const trick = new Trick(players);
      trick.add(ace.of(Suit.Hearts).second(), player1);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(ace.of(Suit.Diamonds).first());
    });

    test("should play higher trump when mustn't serve and somebody else is trumping", () => {
      const trick = new Trick(players);
      trick.add(ace.of(Suit.Hearts).second(), player1);
      trick.add(ten.of(Suit.Diamonds).second(), player2);
      trick.add(ace.of(Suit.Diamonds).second(), player3);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(jack.of(Suit.Diamonds).first());
    });

    test("should play jack, when mustn't serve and high value card isn't available", () => {
      let hand = new Hand([
        king.of(Suit.Diamonds),
        jack.of(Suit.Diamonds).first(),
        ten.of(Suit.Hearts)
      ]);
      const trick = new Trick(players);
      trick.add(ace.of(Suit.Hearts).second(), player1);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(jack.of(Suit.Diamonds).first());
    });

    test("should play lowest card, when can't win because too many cards of suit in own hand", () => {
      const trick = new Trick(players);
      trick.add(king.of(Suit.Spades).second(), player1);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(king.of(Suit.Spades).first());
    });

    test("should keep playing a card, if can't serve or trump a suit", () => {
      let hand = new Hand([king.of(Suit.Spades), ten.of(Suit.Spades)]);
      const trick = new Trick(players);
      trick.add(ace.of(Suit.Hearts).second(), player1);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(expect.any(Card));
    });

    test("should keep playing a card, if can't win a trumped suit", () => {
      let hand = new Hand([jack.of(Suit.Spades), ten.of(Suit.Spades)]);
      const trick = new Trick(players);
      trick.add(ace.of(Suit.Hearts).second(), player1);
      trick.add(jack.of(Suit.Spades).second(), player2);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(expect.any(Card));
    });

    test("should start with ace", () => {
      let hand = new Hand([
        ace.of(Suit.Spades).first(),
        ace.of(Suit.Clubs),
        ten.of(Suit.Clubs),
        ace.of(Suit.Hearts),
        ace.of(Suit.Diamonds)
      ]);
      const trick = new Trick(players);
      const cardToPlay = behavior.cardToPlay(hand, trick, no_memory);
      expect(cardToPlay).toEqual(ace.of(Suit.Spades).first());
    });

    test("should play ace because chance of winning", () => {
      let hand = new Hand([
        ace.of(Suit.Spades).first(),
        ace.of(Suit.Spades).second(),
        ten.of(Suit.Spades)
      ]);
      const trick = new Trick(players);
      trick.add(king.of(Suit.Spades), player3);
      trick.add(king.of(Suit.Spades), player2);
      const cardToPlay = behavior.cardToPlay(hand, trick, player1.memory);
      expect(cardToPlay).toEqual(ace.of(Suit.Spades).second());
    });

    test("should play king because no chance of winning", () => {
      let hand = new Hand([
        ace.of(Suit.Spades).first(),
        ace.of(Suit.Spades).second(),
        ten.of(Suit.Spades).second(),
        king.of(Suit.Spades).second()
      ]);
      const trick = new Trick(players);
      trick.add(king.of(Suit.Spades).first(), player3);
      trick.add(ten.of(Suit.Spades).first(), player2);
      const cardToPlay = behavior.cardToPlay(hand, trick, player1.memory);
      expect(cardToPlay).toEqual(king.of(Suit.Spades).second());
    });

    test("should play ace, as 'best' solution by definition", () => {
      let hand = new Hand([
        ace.of(Suit.Diamonds).first(),
        ten.of(Suit.Hearts).second(),
        ten.of(Suit.Spades).second(),
        king.of(Suit.Spades).second()
      ]);
      const trick = new Trick(players);
      trick.add(king.of(Suit.Clubs).first(), player3);
      trick.add(ace.of(Suit.Clubs).first(), player2);
      const cardToPlay = behavior.cardToPlay(hand, trick, player1.memory);
      expect(cardToPlay).toEqual(ace.of(Suit.Diamonds).first());
    });
  });

  describe("Non-trump has been played already", () => {
    beforeEach(() => {
      players.forEach(playerLoop => {
        playerLoop.memory.clearMemory();
      });
    });
    describe("Above 10 Points left in Suit", () => {
      beforeEach(() => {
        players.forEach(playerLoop => {
          playerLoop.memory.memorize(
            new PlayedCard(ace.of(Suit.Clubs).first(), player1)
          );
          playerLoop.memory.memorize(
            new PlayedCard(king.of(Suit.Clubs).first(), player2)
          );
          playerLoop.memory.memorize(
            new PlayedCard(ten.of(Suit.Clubs).first(), player3)
          );
          playerLoop.memory.memorize(
            new PlayedCard(ten.of(Suit.Clubs).second(), player4)
          );
        });
      });

      test("should keep playing a card, if can't play same suit", () => {
        let hand = new Hand([jack.of(Suit.Spades), ten.of(Suit.Diamonds)]);
        const trick = new Trick(players);
        const aceOfClubs = ace.of(Suit.Clubs).second();
        const jackOfDiamonds = jack.of(Suit.Diamonds).second();
        trick.add(aceOfClubs, player1);
        trick.add(jackOfDiamonds, player2);
        const cardToPlay = behavior.cardToPlay(hand, trick, player1.memory);
        expect(cardToPlay).toEqual(expect.any(Card));
      });

      test("should start with ace of spades, ignoring already played suit, prefering over ace of hearts", () => {
        let hand = new Hand([
          ace.of(Suit.Spades).first(),
          ace.of(Suit.Clubs),
          ten.of(Suit.Clubs),
          ace.of(Suit.Hearts),
          ace.of(Suit.Diamonds)
        ]);
        const trick = new Trick(players);
        const cardToPlay = behavior.cardToPlay(hand, trick, player1.memory);
        expect(cardToPlay).toEqual(ace.of(Suit.Spades).first());
      });

      test("should play lowest value trump, because can't win", () => {
        let hand = new Hand([
          ace.of(Suit.Diamonds),
          jack.of(Suit.Diamonds).first(),
          queen.of(Suit.Diamonds)
        ]);
        const trick = new Trick(players);
        player1.memory.memorize(new PlayedCard(king.of(Suit.Spades), player2));
        trick.add(ten.of(Suit.Spades), player4);
        trick.add(king.of(Suit.Spades), player3);
        trick.add(queen.of(Suit.Spades), player2);
        const cardToPlay = behavior.cardToPlay(hand, trick, player1.memory);
        expect(cardToPlay).toEqual(jack.of(Suit.Diamonds).first());
      });

      test("should play as high as possible, craving for trick", () => {
        let hand = new Hand([
          ace.of(Suit.Diamonds).first(),
          ten.of(Suit.Hearts).second(),
          jack.of(Suit.Spades).second()
        ]);
        const trick = new Trick(players);
        trick.add(king.of(Suit.Clubs).second(), player3);
        trick.add(ace.of(Suit.Clubs).second(), player2);
        const cardToPlay = behavior.cardToPlay(hand, trick, player1.memory);
        expect(cardToPlay).toEqual(ten.of(Suit.Hearts).second());
      });

      test("should play as high as possible, craving for trick, not knowing it will be 20 points for the suit", () => {
        let hand = new Hand([
          ace.of(Suit.Diamonds).first(),
          ten.of(Suit.Hearts).second(),
          jack.of(Suit.Spades).second()
        ]);
        const trick = new Trick(players);
        trick.add(king.of(Suit.Clubs).second(), player3);
        const cardToPlay = behavior.cardToPlay(hand, trick, player1.memory);
        expect(cardToPlay).toEqual(ten.of(Suit.Hearts).second());
      });

      test.skip("should play position, as lowest trump higher than current wins the trick", () => {
        let hand = new Hand([
          ace.of(Suit.Diamonds).first(),
          ten.of(Suit.Hearts).second(),
          jack.of(Suit.Spades).second()
        ]);
        const trick = new Trick(players);
        trick.add(king.of(Suit.Clubs).second(), player3);
        trick.add(ace.of(Suit.Clubs).second(), player2);
        trick.add(jack.of(Suit.Hearts).first(), player4);
        const cardToPlay = behavior.cardToPlay(hand, trick, player1.memory);
        expect(cardToPlay).toEqual(jack.of(Suit.Spades).second());
      });

      test.only("should always play lowest value trump, because trick is lost", () => {
        let hand = new Hand([
          ten.of(Suit.Hearts).second(),
          queen.of(Suit.Spades).second()
        ]);
        const trick = new Trick(players);
        trick.add(king.of(Suit.Clubs).first(), player3);
        trick.add(ace.of(Suit.Clubs).first(), player2);
        trick.add(ten.of(Suit.Hearts).first(), player4);
        const cardToPlay = behavior.cardToPlay(hand, trick, player1.memory);
        expect(cardToPlay).toEqual(queen.of(Suit.Spades).second());
      });
    });

    describe("Less than 10 Points left in Suit", () => {
      beforeEach(() => {
        players.forEach(playerLoop => {
          playerLoop.memory.memorize(
            new PlayedCard(ace.of(Suit.Clubs).first(), player1)
          );
          playerLoop.memory.memorize(
            new PlayedCard(ace.of(Suit.Clubs).second(), player2)
          );
          playerLoop.memory.memorize(
            new PlayedCard(ten.of(Suit.Clubs).first(), player3)
          );
          playerLoop.memory.memorize(
            new PlayedCard(ten.of(Suit.Clubs).second(), player4)
          );
        });
      });

      test("should keep playing a card, if can't play same suit", () => {
        let hand = new Hand([jack.of(Suit.Spades), ten.of(Suit.Diamonds)]);
        const trick = new Trick(players);
        const aceOfClubs = ace.of(Suit.Clubs).second();
        const jackOfDiamonds = jack.of(Suit.Diamonds).second();
        trick.add(aceOfClubs, player1);
        trick.add(jackOfDiamonds, player2);
        const cardToPlay = behavior.cardToPlay(hand, trick, player1.memory);
        expect(cardToPlay).toEqual(expect.any(Card));
      });

      test("should start with ace of spades, ignoring already played suit, prefering over ace of hearts", () => {
        let hand = new Hand([
          ace.of(Suit.Spades).first(),
          ace.of(Suit.Clubs),
          ten.of(Suit.Clubs),
          ace.of(Suit.Hearts),
          ace.of(Suit.Diamonds)
        ]);
        const trick = new Trick(players);
        const cardToPlay = behavior.cardToPlay(hand, trick, player1.memory);
        expect(cardToPlay).toEqual(ace.of(Suit.Spades).first());
      });

      test("should play position, as lowest trump higher than current wins the trick", () => {
        let hand = new Hand([
          ace.of(Suit.Diamonds).first(),
          jack.of(Suit.Clubs).second(),
          jack.of(Suit.Spades).second()
        ]);
        const trick = new Trick(players);
        trick.add(king.of(Suit.Clubs).first(), player3);
        trick.add(king.of(Suit.Clubs).second(), player2);
        trick.add(jack.of(Suit.Hearts).first(), player4);
        const cardToPlay = behavior.cardToPlay(hand, trick, player1.memory);
        expect(cardToPlay).toEqual(jack.of(Suit.Spades).second());
      });
    });
  });
});
