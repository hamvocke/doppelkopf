import { Game } from "@/models/game";
import { Round } from "@/models/round";
import { Notifier } from "@/models/notifier";
import { jack, suits } from "@/models/card";
import { DOPPELKOPF } from "@/models/extras";
import { options } from "@/models/options";

const game = new Game();
let round = game.currentRound;

jest.useFakeTimers();

beforeEach(() => {
  options.autoplay = false;
  jest.runAllTimers();
});

test("round has 4 players", () => {
  expect(round.players).toHaveLength(4);
});

test("should know its game", () => {
  expect(round.game).toBe(game);
});

test("game starts with an empty trick", () => {
  expect(round.currentTrick).toBeDefined();
});

test("should have score", () => {
  expect(round.score).toBeDefined();
});

test("should give current trick to winner", () => {
  round.currentTrick.add(jack.of(suits.spades), round.players[2]);
  round.currentTrick.add(jack.of(suits.hearts), round.players[3]);
  round.currentTrick.add(jack.of(suits.diamonds), round.players[1]);
  round.currentTrick.add(jack.of(suits.clubs), round.players[0]);

  round.finishTrick();

  expect(round.players[0].trickStack.tricks).toHaveLength(1);
});

test("should trigger next move when finishing trick", () => {
  options.autoplay = true;

  round.players[1].autoplay = jest.fn();
  round.currentTrick.add(jack.of(suits.clubs), round.players[1]);
  round.currentTrick.add(jack.of(suits.spades), round.players[2]);
  round.currentTrick.add(jack.of(suits.hearts), round.players[3]);
  round.currentTrick.add(jack.of(suits.diamonds), round.players[0]);

  round.finishTrick();

  expect(round.players[1].autoplay).toBeCalled();
});

test("should autoplay for computer players", () => {
  const mockedComputerPlayer = round.players[1];
  mockedComputerPlayer.autoplay = jest.fn();
  round.playerOrder.prioritize(mockedComputerPlayer);

  round.nextMove();

  expect(mockedComputerPlayer.autoplay).toBeCalled();
});

test("should not autoplay for human players", () => {
  const mockedHumanPlayer = round.players[0];
  mockedHumanPlayer.autoplay = jest.fn();
  round.playerOrder.prioritize(mockedHumanPlayer);

  round.nextMove();

  expect(mockedHumanPlayer.autoplay).not.toBeCalled();
});

test("should not autoplay if trick is finished", () => {
  const mockedComputerPlayer = round.players[1];
  mockedComputerPlayer.autoplay = jest.fn();
  round.playerOrder.prioritize(mockedComputerPlayer);
  round.currentTrick.finished = true;

  round.nextMove();

  expect(mockedComputerPlayer.autoplay).not.toBeCalled();
});

test("should not autoplay if round is finished", () => {
  const mockedComputerPlayer = round.players[1];
  mockedComputerPlayer.autoplay = jest.fn();
  round.playerOrder.prioritize(mockedComputerPlayer);
  round.currentTrick.finished = false;
  round.finished = true;

  round.nextMove();

  expect(mockedComputerPlayer.autoplay).not.toBeCalled();
});

test("should show extras as flash message", () => {
  round.currentTrick.add(jack.of(suits.spades), round.players[2]);
  round.currentTrick.add(jack.of(suits.hearts), round.players[3]);
  round.currentTrick.add(jack.of(suits.diamonds), round.players[1]);
  round.currentTrick.add(jack.of(suits.clubs), round.players[0]);

  round.currentTrick.extras = () => DOPPELKOPF;

  round.finishTrick();

  const notifier = new Notifier();
  expect(notifier.flashMessages).toHaveLength(1);
});

describe("player order", () => {
  beforeEach(() => {
    round = new Game().currentRound;
  });

  test("should start with given player", () => {
    round = new Round(game.players, game, game.players[2]);
    expect(round.waitingForPlayer().id).toBe(round.players[2].id);
  });

  test("should put player on top of player order if player wins a trick", () => {
    round.currentTrick.add(jack.of(suits.spades), round.players[2]);
    round.currentTrick.add(jack.of(suits.clubs), round.players[3]);
    round.currentTrick.add(jack.of(suits.diamonds), round.players[1]);
    round.currentTrick.add(jack.of(suits.clubs), round.players[0]);

    round.finishTrick();

    expect(round.waitingForPlayer().id).toEqual(round.players[3].id);
  });

  test("should change active player on next move", () => {
    const playFirstCardBehavior = {
      cardToPlay: hand => hand.cards[0]
    };
    round.playerOrder.prioritize(round.players[3]);
    round.players[3].behavior = playFirstCardBehavior;

    round.nextMove();

    expect(round.waitingForPlayer()).toBe(round.players[0]);
  });
});

describe("finish round", () => {
  beforeEach(() => {
    round = new Game().currentRound;
  });

  test("should be able to finish round if players have no more cards on hand", () => {
    expect(round.noMoreCardsLeft()).toBe(false);

    setupNoCardsLeft();

    expect(round.noMoreCardsLeft()).toBe(true);
  });

  test("should not be able to finish round if player has card left on hand", () => {
    round.players[0].hand.cards = [];
    round.players[1].hand.cards = [];
    round.players[2].hand.cards = [];
    round.players[3].hand.cards = [jack.of(suits.hearts)];

    expect(round.noMoreCardsLeft()).toBe(false);
  });

  test("should add score to scorecard", () => {
    setupGameKontraWins();

    round.finishRound();

    const scorecard = round.game.scorecard;

    expect(scorecard.totalPointsFor(round.players[0])).toBe(-2);
    expect(scorecard.totalPointsFor(round.players[1])).toBe(-2);
    expect(scorecard.totalPointsFor(round.players[2])).toBe(2);
    expect(scorecard.totalPointsFor(round.players[3])).toBe(2);
  });

  test("should mark round as finished", () => {
    expect(round.isFinished()).toBe(false);

    setupGameKontraWins();

    round.finishRound();
    expect(round.isFinished()).toBe(true);
  });

  test("should finish trick when finishing round", () => {
    setupGameKontraWins();

    expect(round.currentTrick.cards()).toHaveLength(4);

    round.finishRound();

    expect(round.currentTrick.cards()).toHaveLength(0);
  });

  test("should throw exception if round is not yet finished", () => {
    round.players[0].hand.cards = [jack.of(suits.hearts)];

    function finishUnfinishedRound() {
      round.finishRound();
    }

    expect(finishUnfinishedRound).toThrowError(
      `Can't finish a round before all cards have been played`
    );
  });
});

function setupGameKontraWins() {
  const firstTrickStack = { points: () => 63, extras: () => [] };
  const secondTrickStack = { points: () => 56, extras: () => [] };
  const thirdTrickStack = { points: () => 64, extras: () => [] };
  const fourthTrickStack = { points: () => 57, extras: () => [] };

  round.players[0].isRe = () => true;
  round.players[1].isRe = () => true;
  round.players[2].isRe = () => false;
  round.players[3].isRe = () => false;

  round.players[3].win = jest.fn();

  round.currentTrick.add(jack.of(suits.hearts), round.players[0]);
  round.currentTrick.add(jack.of(suits.spades), round.players[1]);
  round.currentTrick.add(jack.of(suits.hearts), round.players[2]);
  round.currentTrick.add(jack.of(suits.clubs), round.players[3]);

  setupNoCardsLeft();

  round.players[0].trickStack = firstTrickStack;
  round.players[1].trickStack = secondTrickStack;
  round.players[2].trickStack = thirdTrickStack;
  round.players[3].trickStack = fourthTrickStack;
}

function setupNoCardsLeft() {
  round.players[0].hand.cards = [];
  round.players[1].hand.cards = [];
  round.players[2].hand.cards = [];
  round.players[3].hand.cards = [];
}
