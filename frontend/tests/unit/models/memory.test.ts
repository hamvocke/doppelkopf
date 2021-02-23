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
    expect(memory.playedCards.length).toBe(8);
  });

  test("percentage memory memorizes a percentage of things", () => {
    const memory = new PercentageMemory(0.9);
    const player = new Player("some player");
    for (let index = 0; index < 10000; index++) {
      memory.memorize(new PlayedCard(jack.of(Suit.Diamonds), player));
    }
    expect(memory.playedCards.length).toBeGreaterThanOrEqual(8700);
    expect(memory.playedCards.length).toBeLessThanOrEqual(9300);
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
    expect(memory.playedCards.length).toBe(5);
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

  test("Should clear all playedCards from memory", () => {
    const memory = new PerfectMemory();
    memory.memorize(new PlayedCard(ace.of(Suit.Hearts), new Player("A")));
    memory.memorize(new PlayedCard(ace.of(Suit.Spades), new Player("B")));
    expect(memory.playedCards.length).toBe(2);
    memory.clearMemory();
    expect(memory.playedCards.length).toBe(0);
  });

  test("Should calculate points left in suit", () => {
    const memory = new PerfectMemory();
    memory.memorize(new PlayedCard(ace.of(Suit.Spades), new Player("A")));
    memory.memorize(new PlayedCard(ten.of(Suit.Spades), new Player("B")));
    memory.memorize(new PlayedCard(king.of(Suit.Spades), new Player("C")));
    memory.memorize(new PlayedCard(king.of(Suit.Spades), new Player("D")));
    expect(memory.pointsLeftInSuit(Suit.Spades)).toBe(21);
  });
});
