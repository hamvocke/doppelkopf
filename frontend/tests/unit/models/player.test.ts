import { Player } from "@/models/player";
import { Game } from "@/models/game";
import { Hand } from "@/models/hand";
import { PlayedCard } from "@/models/playedCard";
import { king, queen, ten, suits, Card, cardOrder } from "@/models/card";
import { TrickStack } from "@/models/trickStack";
import { Notifier } from "@/models/notifier";
import { options } from "@/models/options";
import { sampleSize } from "lodash-es";
import { announcements } from "@/models/announcements";
import { Trick } from "@/models/trick";

let game: any;
let player: Player;
const notifier = new Notifier();

jest.useFakeTimers();

beforeEach(() => {
  game = Game.singlePlayer();
  player = game.players[0];
  player.game.currentRound.waitingForPlayer = () => game.players[0];
  options.autoplay = false;
  jest.runAllTimers();
});

test("player has a name", () => {
  expect(player.name).toBeDefined();
});

test("player has a position", () => {
  expect(player.tablePosition).toBeDefined();
});

test("player is not human by default", () => {
  expect(new Player("some player").isHuman).toBe(false);
});

test("player has a trick stack", () => {
  expect(new Player("some player").trickStack).toBeDefined();
  expect(new Player("some player").trickStack instanceof TrickStack).toBe(true);
});

test("should belong to re party", () => {
  player.hand = new Hand([queen.of(suits.clubs)]);

  expect(player.isRe()).toBe(true);
  expect(player.isKontra()).toBe(false);
});

test("should belong to kontra party", () => {
  player.hand = new Hand([queen.of(suits.spades)]);

  expect(player.isRe()).toBe(false);
  expect(player.isKontra()).toBe(true);
});

test("player can play card from hand", () => {
  const kingOnHand = king.of(suits.diamonds);
  const queenOnHand = queen.of(suits.spades);
  player.hand = new Hand([kingOnHand, queenOnHand]);

  player.play(kingOnHand);

  expect(player.hand.cards).not.toContain(kingOnHand);
  expect(player.hand.cards).toContain(queenOnHand);
});

test("should move to next player after playing a card", () => {
  player.game.currentRound.nextPlayer = jest.fn();
  const kingOnHand = king.of(suits.diamonds);
  player.hand = new Hand([kingOnHand]);

  player.play(kingOnHand);

  expect(player.game.currentRound.nextPlayer).toBeCalled();
});

test("should trigger next move if autoplay option is enabled", () => {
  options.autoplay = true;
  player.game.currentRound.nextMove = jest.fn();
  const kingOnHand = king.of(suits.diamonds);
  player.hand = new Hand([kingOnHand]);

  player.play(kingOnHand);
  jest.runAllTimers();

  expect(player.game.currentRound.nextMove).toBeCalled();
});

test("should not trigger next move if autoplay option is disabled", () => {
  options.autoplay = false;
  player.game.currentRound.nextMove = jest.fn();
  const kingOnHand = king.of(suits.diamonds);
  player.hand = new Hand([kingOnHand]);

  player.play(kingOnHand);
  jest.runAllTimers();

  expect(player.game.currentRound.nextMove).not.toBeCalled();
});

test("playing a card adds it to the current trick", () => {
  const queenOnHand = queen.of(suits.spades);
  player.hand = new Hand([queenOnHand]);

  player.play(queenOnHand);

  const expectedCard = new PlayedCard(queenOnHand, player);

  expect(game.currentTrick.cards()).toEqual([expectedCard]);
});

test("player cannot play card that is not on their hand", () => {
  player.hand = new Hand([king.of(suits.diamonds)]);

  function invalidMove() {
    player.play(queen.of(suits.diamonds));
  }

  expect(invalidMove).toThrowError(
    "can't play a card that's not on the player's hand"
  );
});

test("player cannot play undefined card", () => {
  player.hand = new Hand([king.of(suits.diamonds)]);

  function invalidMove() {
    player.play(king.of(suits.clubs));
  }

  expect(invalidMove).toThrowError(
    "can't play a card that's not on the player's hand"
  );
});

test("player can win a trick", () => {
  const trick = new Trick(Array.of(player));
  trick.add(king.of(suits.diamonds), player);

  player.win(trick);

  expect(player.trickStack.tricks).toEqual([trick]);
});

test("should autoplay a card", () => {
  const queenOnHand = queen.of(suits.spades);
  const kingOnHand = king.of(suits.diamonds);
  player.game.currentTrick.baseCard = () => queen.of(suits.diamonds);
  player.hand = new Hand([queenOnHand, kingOnHand]);
  player.behavior = {
    cardToPlay: jest.fn(() => kingOnHand),
    announcementToMake: jest.fn(() => null)
  };

  player.autoplay();

  expect(player.hand.cards).not.toContain(kingOnHand);
  expect(player.behavior.cardToPlay).toBeCalledWith(
    player.hand,
    player.game.currentTrick,
    player.memory
  );
});

test("should try to make an announcement", () => {
  player.hand = aHandWith(10);
  game.currentRound.waitingForPlayer = () => game.players[0];
  player.behavior = {
    cardToPlay: jest.fn(() => player.hand.cards[0]),
    announcementToMake: jest.fn(() => null)
  };

  player.autoplay();

  expect(player.behavior.announcementToMake).toBeCalledWith(expect.any(Set));
});

test("should not play a card if its not the players turn", () => {
  const queenOnHand = queen.of(suits.spades);
  player.hand = new Hand([queenOnHand]);
  game.currentRound.waitingForPlayer = () => game.players[1];

  player.play(queenOnHand);

  expect(player.hand.cards).toContain(queenOnHand);
});

test("should show notification if trying to play a card when its not your turn", () => {
  const queenOnHand = queen.of(suits.spades);
  player.hand = new Hand([queenOnHand]);
  game.currentRound.waitingForPlayer = () => game.players[1];

  player.play(queenOnHand);

  expect(notifier.notifications[0].text).toBe("not-your-turn");
});

test("should not play card and show notification if trying to play an invalid card", () => {
  const queenOnHand = queen.of(suits.spades);
  const tenOnHand = ten.of(suits.spades);
  player.hand = new Hand([queenOnHand, tenOnHand]);
  game.currentRound.waitingForPlayer = () => player;
  game.currentTrick.baseCard = () => ten.of(suits.spades);

  player.play(queenOnHand);

  expect(player.hand.cards).toContain(queenOnHand);
  expect(notifier.notifications[0].text).toBe("cant-play-card");
});

test("should validate playable cards", () => {
  const queenOnHand = queen.of(suits.spades);
  const tenOnHand = ten.of(suits.spades);
  player.hand = new Hand([queenOnHand, tenOnHand]);

  game.currentTrick.baseCard = () => ten.of(suits.spades);

  expect(player.canPlay(queenOnHand)).toBe(false);
  expect(player.canPlay(tenOnHand)).toBe(true);
});

test("should validate playable cards if no card has been played yet", () => {
  const queenOnHand = queen.of(suits.spades);
  const tenOnHand = ten.of(suits.spades);
  player.hand = new Hand([queenOnHand, tenOnHand]);

  game.currentTrick.baseCard = () => undefined;

  expect(player.canPlay(queenOnHand)).toBe(true);
  expect(player.canPlay(tenOnHand)).toBe(true);
});

test("should clear trick stack when resetting player", () => {
  const trick = new Trick(game.players);
  trick.add(queen.of(suits.clubs), game.players[0]);
  trick.add(queen.of(suits.spades), game.players[1]);
  trick.add(queen.of(suits.hearts), game.players[2]);
  trick.add(queen.of(suits.diamonds), game.players[3]);
  player.win(trick);

  expect(player.trickStack).not.toEqual(new TrickStack());
  player.reset();

  expect(player.trickStack).toEqual(new TrickStack());
});

test("should clear announcements when resetting player", () => {
  player.announce(player.isRe() ? announcements.re : announcements.kontra);

  player.reset();

  expect(player.announcements).toEqual(new Set());
});

describe("announcements", () => {
  test("should announce", () => {
    player.hand = aHandWith(10, queen.of(suits.clubs));

    player.announce(announcements.re);

    expect(player.announcements).toContain(announcements.re);
  });

  test("should validate announcement", () => {
    player.hand = aHandWith(7, queen.of(suits.clubs));

    let failingAnnouncement = () => player.announce(announcements.no_90);

    expect(failingAnnouncement).toThrowError("Invalid announcement");
  });

  test("should automatically announce previous steps", () => {
    player.hand = aHandWith(10, queen.of(suits.clubs));

    player.announce(announcements.no_points);

    expect(player.announcements).toEqual(
      new Set([
        announcements.re,
        announcements.no_90,
        announcements.no_60,
        announcements.no_30,
        announcements.no_points
      ])
    );
  });

  test("should be able to announce 're' when player is re", () => {
    player.hand = aHandWith(10, queen.of(suits.clubs));

    let possibleAnnouncements = player.possibleAnnouncements();

    let expectedAnnouncements = new Set([
      announcements.re,
      announcements.no_90,
      announcements.no_60,
      announcements.no_30,
      announcements.no_points
    ]);
    expect(possibleAnnouncements).toEqual(expectedAnnouncements);
  });

  test("should be able to announce 'kontra' when player is kontra", () => {
    player.hand = aHandWithout(9, queen.of(suits.clubs));

    let possibleAnnouncements = player.possibleAnnouncements();

    let expectedAnnouncements = new Set([
      announcements.kontra,
      announcements.no_90,
      announcements.no_60,
      announcements.no_30,
      announcements.no_points
    ]);
    expect(possibleAnnouncements).toEqual(expectedAnnouncements);
  });

  const announcementThreholds = [
    {
      numberOfCards: 8,
      previousAnnouncements: [announcements.re],
      expectedAnnouncements: [
        announcements.no_90,
        announcements.no_60,
        announcements.no_30,
        announcements.no_points
      ]
    },
    {
      numberOfCards: 8,
      previousAnnouncements: [],
      expectedAnnouncements: []
    },
    {
      numberOfCards: 7,
      previousAnnouncements: [announcements.re, announcements.no_90],
      expectedAnnouncements: [
        announcements.no_60,
        announcements.no_30,
        announcements.no_points
      ]
    },
    {
      numberOfCards: 7,
      previousAnnouncements: [announcements.re],
      expectedAnnouncements: []
    },
    {
      numberOfCards: 6,
      previousAnnouncements: [
        announcements.re,
        announcements.no_90,
        announcements.no_60
      ],
      expectedAnnouncements: [announcements.no_30, announcements.no_points]
    },
    {
      numberOfCards: 6,
      previousAnnouncements: [announcements.re, announcements.no_90],
      expectedAnnouncements: []
    },
    {
      numberOfCards: 5,
      previousAnnouncements: [
        announcements.re,
        announcements.no_90,
        announcements.no_60,
        announcements.no_30
      ],
      expectedAnnouncements: [announcements.no_points]
    },
    {
      numberOfCards: 5,
      previousAnnouncements: [
        announcements.re,
        announcements.no_90,
        announcements.no_60
      ],
      expectedAnnouncements: []
    }
  ];

  test.each(announcementThreholds)(
    "should respect announcement thresholds",
    ({ numberOfCards, previousAnnouncements, expectedAnnouncements }) => {
      player.hand = aHandWith(numberOfCards, queen.of(suits.clubs));
      previousAnnouncements.forEach(a => player.announcements.add(a));

      const possibleAnnouncements = player.possibleAnnouncements();

      expect([...possibleAnnouncements]).toEqual(expectedAnnouncements);
    }
  );

  test("should not be able to make same announcement twice", () => {
    player.hand = aHandWith(9, queen.of(suits.clubs));
    [
      announcements.re,
      announcements.no_90,
      announcements.no_60,
      announcements.no_30,
      announcements.no_points
    ].forEach(a => player.announcements.add(a));

    let possibleAnnouncements = player.possibleAnnouncements();

    expect(possibleAnnouncements).toEqual(new Set());
  });
});

function aHandWith(numberOfCards: number, ...cards: Card[]) {
  let cardsOnHand = cards;

  cardsOnHand.push(...sampleSize(cardOrder, numberOfCards - cards.length));

  return new Hand(cardsOnHand);
}

function aHandWithout(numberOfCards: number, excludedCard: Card) {
  let cards = sampleSize(
    cardOrder.filter(
      card =>
        !(card.suit === excludedCard.suit && card.rank === excludedCard.rank)
    ),
    numberOfCards
  );
  return new Hand(cards);
}
