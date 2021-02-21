import { TrickStack } from "@/models/trickStack";
import { Trick } from "@/models/trick";
import { Player } from "@/models/player";
import { ace, ten, king, queen, suits } from "@/models/card";
import { extras } from "@/models/extras";

const player1 = new Player("player 1");
const player2 = new Player("player 2");
const player3 = new Player("player 3");
const player4 = new Player("player 4");
const players = [player1, player2, player3, player4];

let trickStack: TrickStack;

beforeEach(() => {
  trickStack = new TrickStack();
});

test("should add trick to trick stack", () => {
  const trick = new Trick(players);
  trick.add(ace.of(suits.hearts), player1);
  trick.add(ace.of(suits.hearts), player2);
  trick.add(ace.of(suits.spades), player3);
  trick.add(ace.of(suits.clubs), player4);

  trickStack.add(trick);

  expect(trickStack.tricks).toHaveLength(1);
  expect(trickStack.tricks[0]).toEqual(trick);
});

test("should list all cards in trick stack", () => {
  const someTrick = new Trick(players.slice(0, 2));
  const anotherTrick = new Trick(players.slice(0, 2));
  someTrick.add(ace.of(suits.hearts), player1);
  someTrick.add(ace.of(suits.hearts), player2);
  anotherTrick.add(ace.of(suits.spades), player1);
  anotherTrick.add(ace.of(suits.clubs), player2);

  trickStack.add(someTrick);
  trickStack.add(anotherTrick);

  expect(trickStack.cards()).toHaveLength(4);
});

test("should throw error if adding non-finished trick to stack", () => {
  function invalidMove() {
    let trick = new Trick(players);
    trick.add(ace.of(suits.hearts), players[0]);
    trickStack.add(trick);
  }

  expect(invalidMove).toThrowError(
    `can not add an unfinished trick to the trick stack`
  );
});

test("should calculate points of trick", () => {
  const someTrick = new Trick(players);
  someTrick.add(ace.of(suits.hearts), player1);
  someTrick.add(ten.of(suits.hearts), player2);
  someTrick.add(king.of(suits.hearts), player3);
  someTrick.add(ace.of(suits.hearts), player4);

  const anotherTrick = new Trick(players);
  anotherTrick.add(ace.of(suits.spades), player1);
  anotherTrick.add(queen.of(suits.clubs), player2);
  anotherTrick.add(king.of(suits.spades), player3);
  anotherTrick.add(ten.of(suits.clubs), player4);

  trickStack.add(someTrick);
  trickStack.add(anotherTrick);

  expect(trickStack.points()).toBe(64);
});

test("should evaluate trick stack", () => {
  const someTrick = new Trick(players);
  someTrick.add(ace.of(suits.hearts), player1);
  someTrick.add(ten.of(suits.hearts), player3);
  someTrick.add(king.of(suits.hearts), player2);
  someTrick.add(ace.of(suits.hearts), player4);
  trickStack.add(someTrick);

  expect(trickStack.points()).toBe(36);
  expect(trickStack.extras()).toEqual([]);
});

describe("extras", () => {
  test("should find Doppelkopf", () => {
    const someTrick = new Trick(players);
    someTrick.add(ace.of(suits.hearts), player1);
    someTrick.add(ten.of(suits.hearts), player3);
    someTrick.add(ten.of(suits.hearts), player2);
    someTrick.add(ace.of(suits.hearts), player4);
    trickStack.add(someTrick);

    expect(trickStack.points()).toBe(42);
    expect(trickStack.extras()).toEqual([extras.doppelkopf]);
  });

  test("should find Fox", () => {
    const someTrick = new Trick(players);
    player1.isRe = () => false;
    player3.isRe = () => true;

    someTrick.add(ace.of(suits.diamonds), player1);
    someTrick.add(ten.of(suits.hearts), player3);
    someTrick.add(king.of(suits.hearts), player2);
    someTrick.add(ace.of(suits.hearts), player4);
    trickStack.add(someTrick);

    expect(trickStack.extras()).toEqual([extras.fox]);
  });

  test("should find Doppelkopf and Fox", () => {
    const someTrick = new Trick(players);
    player1.isRe = () => false;
    player3.isRe = () => true;

    someTrick.add(ace.of(suits.diamonds), player1);
    someTrick.add(ten.of(suits.hearts), player3);
    someTrick.add(ten.of(suits.hearts), player2);
    someTrick.add(ace.of(suits.hearts), player4);
    trickStack.add(someTrick);

    expect(trickStack.extras()).toEqual([extras.doppelkopf, extras.fox]);
  });
});
