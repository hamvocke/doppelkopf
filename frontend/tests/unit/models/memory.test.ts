import { ace, jack, king, queen, Suit, ten } from "@/models/card";
import { PlayedCard } from "@/models/playedCard";
import { Player } from "@/models/player";
import {
  PercentageMemory,
  PerfectMemory,
  PriorityMemory
} from "@/models/memory";

describe("Testing memorize function", () => {
  test("perfect memory memorizes everything", () => {
    const memory = new PerfectMemory();
    const player = new Player("some-player");
    memory.memorize(new PlayedCard(jack.of(Suit.Diamonds), player));
    memory.memorize(new PlayedCard(jack.of(Suit.Diamonds), player));
    memory.memorize(new PlayedCard(jack.of(Suit.Hearts), player));
    memory.memorize(new PlayedCard(jack.of(Suit.Hearts), player));
    memory.memorize(new PlayedCard(jack.of(Suit.Spades), player));
    memory.memorize(new PlayedCard(jack.of(Suit.Spades), player));
    memory.memorize(new PlayedCard(jack.of(Suit.Clubs), player));
    memory.memorize(new PlayedCard(jack.of(Suit.Clubs), player));
    expect(memory.memorizedCards.length).toBe(8);
  });

  test("percentage memory memorizes a percentage of things", () => {
    const memory = new PercentageMemory(0.9);
    const player = new Player("some player");
    for (let index = 0; index < 10000; index++) {
      memory.memorize(new PlayedCard(jack.of(Suit.Diamonds), player));
    }
    expect(memory.memorizedCards.length).toBeGreaterThanOrEqual(8700);
    expect(memory.memorizedCards.length).toBeLessThanOrEqual(9300);
  });

  test("priority memory memorizes only specific cards", () => {
    const memory = new PriorityMemory();
    const player = new Player("some player");
    memory.memorize(new PlayedCard(king.of(Suit.Diamonds), player));
    memory.memorize(new PlayedCard(jack.of(Suit.Diamonds), player));
    memory.memorize(new PlayedCard(ten.of(Suit.Hearts), player));
    memory.memorize(new PlayedCard(queen.of(Suit.Spades), player));
    memory.memorize(new PlayedCard(ten.of(Suit.Hearts), player));
    memory.memorize(new PlayedCard(king.of(Suit.Spades), player));
    memory.memorize(new PlayedCard(ace.of(Suit.Diamonds), player));
    memory.memorize(new PlayedCard(ace.of(Suit.Clubs), player));
    expect(memory.memorizedCards.length).toBe(5);
  });
});

describe("Testing functionality", () => {
  test("Should detect that suit hasn't been played", () => {
    const memory = new PerfectMemory();
    expect(memory.nonTrumpSuitPlayedBefore(Suit.Hearts)).toEqual(false);
    expect(memory.nonTrumpSuitPlayedBefore(Suit.Spades)).toEqual(false);
    expect(memory.nonTrumpSuitPlayedBefore(Suit.Clubs)).toEqual(false);
  });

  test("Should detect that suit has been played", () => {
    const memory = new PerfectMemory();
    memory.memorize(new PlayedCard(ace.of(Suit.Hearts), new Player("A")));
    memory.memorize(new PlayedCard(ace.of(Suit.Spades), new Player("B")));
    expect(memory.nonTrumpSuitPlayedBefore(Suit.Hearts)).toEqual(true);
    expect(memory.nonTrumpSuitPlayedBefore(Suit.Spades)).toEqual(true);
    expect(memory.nonTrumpSuitPlayedBefore(Suit.Clubs)).toEqual(false);
  });

  test("Should detect that suit hasn't been played before", () => {
    const memory = new PerfectMemory();
    memory.memorize(new PlayedCard(ten.of(Suit.Hearts), new Player("A")));
    memory.memorize(new PlayedCard(queen.of(Suit.Spades), new Player("B")));
    expect(memory.nonTrumpSuitPlayedBefore(Suit.Hearts)).toEqual(false);
    expect(memory.nonTrumpSuitPlayedBefore(Suit.Spades)).toEqual(false);
    expect(memory.nonTrumpSuitPlayedBefore(Suit.Clubs)).toEqual(false);
  });

  test("Should clear all memorizedCards from memory", () => {
    const memory = new PerfectMemory();
    memory.memorize(new PlayedCard(ace.of(Suit.Hearts), new Player("A")));
    memory.memorize(new PlayedCard(ace.of(Suit.Spades), new Player("B")));
    expect(memory.memorizedCards.length).toBe(2);
    memory.clearMemory();
    expect(memory.memorizedCards.length).toBe(0);
  });

  test("Should calculate points left in suit", () => {
    const memory = new PerfectMemory();
    memory.memorize(new PlayedCard(ace.of(Suit.Spades), new Player("A")));
    memory.memorize(new PlayedCard(ten.of(Suit.Spades), new Player("B")));
    memory.memorize(new PlayedCard(king.of(Suit.Spades), new Player("C")));
    memory.memorize(new PlayedCard(king.of(Suit.Spades), new Player("D")));
    expect(memory.pointsLeftInSuit(Suit.Spades)).toBe(21);
  });

  test("Should calculate points left in suit - hearts", () => {
    const memory = new PerfectMemory();
    memory.memorize(new PlayedCard(ace.of(Suit.Hearts), new Player("A")));
    memory.memorize(new PlayedCard(ace.of(Suit.Hearts), new Player("B")));
    memory.memorize(new PlayedCard(king.of(Suit.Hearts), new Player("C")));
    memory.memorize(new PlayedCard(king.of(Suit.Hearts), new Player("D")));
    expect(memory.pointsLeftInSuit(Suit.Hearts)).toBe(0);
  });

  test("Should calculate points left in suit, ignoring trumps", () => {
    const memory = new PerfectMemory();
    memory.memorize(new PlayedCard(ace.of(Suit.Spades), new Player("A")));
    memory.memorize(new PlayedCard(ten.of(Suit.Spades), new Player("B")));
    memory.memorize(new PlayedCard(king.of(Suit.Spades), new Player("C")));
    memory.memorize(new PlayedCard(king.of(Suit.Spades), new Player("D")));
    memory.memorize(new PlayedCard(jack.of(Suit.Spades), new Player("E")));
    memory.memorize(new PlayedCard(jack.of(Suit.Spades), new Player("F")));
    memory.memorize(new PlayedCard(queen.of(Suit.Spades), new Player("G")));
    expect(memory.pointsLeftInSuit(Suit.Spades)).toBe(21);
  });

  test("Should detect that suit has already been played in different trick", () => {
    const memory = new PerfectMemory();
    memory.memorize(
      new PlayedCard(ace.of(Suit.Spades), new Player("A")),
      "trick1"
    );
    expect(memory.nonTrumpSuitPlayedBefore(Suit.Spades)).toEqual(true);
    expect(memory.nonTrumpSuitPlayedBefore(Suit.Spades, "trick2")).toEqual(
      true
    );
  });

  test("Should detect that suit hasn't been played in different trick", () => {
    const memory = new PerfectMemory();
    memory.memorize(
      new PlayedCard(ace.of(Suit.Spades), new Player("A")),
      "trick1"
    );
    expect(memory.nonTrumpSuitPlayedBefore(Suit.Spades)).toEqual(true);
    expect(memory.nonTrumpSuitPlayedBefore(Suit.Spades, "trick1")).toEqual(
      false
    );
  });

  test("Should detect that queen of clubs is highest card left in game", () => {
    const memory = new PerfectMemory();
    memory.memorize(
      new PlayedCard(ten.of(Suit.Hearts).first(), new Player("A"))
    );
    memory.memorize(
      new PlayedCard(ten.of(Suit.Hearts).second(), new Player("B"))
    );
    memory.memorize(
      new PlayedCard(queen.of(Suit.Spades).first(), new Player("C"))
    );
    expect(memory.isHighestCardLeft(ten.of(Suit.Hearts))).toEqual(true);
    expect(memory.isHighestCardLeft(queen.of(Suit.Clubs))).toEqual(true);
    expect(memory.isHighestCardLeft(jack.of(Suit.Spades))).toEqual(false);
  });
});
