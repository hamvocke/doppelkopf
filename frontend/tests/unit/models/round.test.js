import { Game } from "@/models/game";
import { jack, suits } from "@/models/card";
import { options } from "@/models/options";
import { re, kontra } from "@/models/parties";

const game = new Game();
let round = game.currentRound;

beforeEach(() => {
  options.autoplay = false;
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

test("should return players for each party", () => {
  round.players[0].isRe = () => true;
  round.players[1].isRe = () => false;
  round.players[2].isRe = () => true;
  round.players[3].isRe = () => false;

  const parties = round.findParties();

  const expectedParties = {
    [re]: [round.players[0], round.players[2]],
    [kontra]: [round.players[1], round.players[3]]
  };

  expect(parties).toEqual(expectedParties);
});

describe("player order", () => {
  beforeEach(() => {
    round = new Game().currentRound;
  });

  test("should start with human player", () => {
    expect(round.waitingForPlayer()).toBe(round.players[0]);
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

  test("should calculate score", () => {
    setupGameKontraWins();

    const score = round.calculateScore();

    expect(score.winner()).toEqual(kontra);
  });

  test("should add score to scorecard", () => {
    setupGameKontraWins();

    round.finishRound();

    const scorecard = round.game.scorecard;

    expect(scorecard.scoreFor(round.players[0])).toBe(-1);
    expect(scorecard.scoreFor(round.players[1])).toBe(-1);
    expect(scorecard.scoreFor(round.players[2])).toBe(1);
    expect(scorecard.scoreFor(round.players[3])).toBe(1);
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
  const firstTrickStack = { points: () => 63 };
  const secondTrickStack = { points: () => 56 };
  const thirdTrickStack = { points: () => 64 };
  const fourthTrickStack = { points: () => 57 };

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
