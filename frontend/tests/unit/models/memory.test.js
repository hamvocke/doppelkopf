import { ace, jack, king, queen, suits, ten } from "@/models/card";
import { PlayedCard } from "@/models/playedCard";
import { Player } from "@/models/player";
import {
  PercentageMemory,
  PerfectMemory,
  PriorityMemory
} from "@/models/memory";

test("perfect memory memorizes everything", () => {
  const memory = new PerfectMemory();
  const player = new Player();
  memory.memorize(new PlayedCard(jack.of(suits.diamonds), player));
  memory.memorize(new PlayedCard(jack.of(suits.diamonds), player));
  memory.memorize(new PlayedCard(jack.of(suits.hearts), player));
  memory.memorize(new PlayedCard(jack.of(suits.hearts), player));
  memory.memorize(new PlayedCard(jack.of(suits.spades), player));
  memory.memorize(new PlayedCard(jack.of(suits.spades), player));
  memory.memorize(new PlayedCard(jack.of(suits.clubs), player));
  memory.memorize(new PlayedCard(jack.of(suits.clubs), player));
  expect(memory.playedCards.length).toBe(8);
});

test("percentage memory memorizes a percentage of things", () => {
  const memory = new PercentageMemory(0.9);
  const player = new Player();
  for (let index = 0; index < 10000; index++) {
    memory.memorize(new PlayedCard(jack.of(suits.diamonds), player));
  }
  expect(memory.playedCards.length).toBeGreaterThanOrEqual(8700);
  expect(memory.playedCards.length).toBeLessThanOrEqual(9300);
});

test("priority memory memorizes only specific cards", () => {
  const memory = new PriorityMemory();
  const player = new Player();
  memory.memorize(new PlayedCard(king.of(suits.diamonds), player));
  memory.memorize(new PlayedCard(jack.of(suits.diamonds), player));
  memory.memorize(new PlayedCard(ten.of(suits.hearts), player));
  memory.memorize(new PlayedCard(queen.of(suits.spades), player));
  memory.memorize(new PlayedCard(ten.of(suits.hearts), player));
  memory.memorize(new PlayedCard(king.of(suits.spades), player));
  memory.memorize(new PlayedCard(ace.of(suits.diamonds), player));
  memory.memorize(new PlayedCard(ace.of(suits.clubs), player));
  expect(memory.playedCards.length).toBe(5);
});
