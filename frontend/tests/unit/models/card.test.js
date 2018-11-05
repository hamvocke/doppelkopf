import { ace, ten, king, queen, jack, suits } from "@/models/card";

test("ace has a value of 11", () => {
  const aceOfClubs = ace.of(suits.clubs);
  expect(aceOfClubs.value).toBe(11);
});

test("ten has a value of 10", () => {
  const tenOfDiamonds = ten.of(suits.diamonds);
  expect(tenOfDiamonds.value).toBe(10);
});

test("king has a value of 4", () => {
  const kingOfHearts = king.of(suits.hearts);
  expect(kingOfHearts.value).toBe(4);
});

test("queen has a value of 3", () => {
  const queenOfClubs = queen.of(suits.clubs);
  expect(queenOfClubs.value).toBe(3);
});

test("jack has a value of 2", () => {
  const jackOfClubs = jack.of(suits.clubs);
  expect(jackOfClubs.value).toBe(2);
});

test("jack has a value of 2", () => {
  const jackOfClubs = jack.of(suits.clubs);
  expect(jackOfClubs.value).toBe(2);
});

test("compare two cards", () => {
  expect(jack.of(suits.clubs).first()).toEqual(jack.of(suits.clubs).first());
});

test("compare identity two cards", () => {
  expect(jack.of(suits.clubs).first()).not.toBe(jack.of(suits.clubs).first());
});

test("compare two cards with same face", () => {
  expect(jack.of(suits.clubs).first()).not.toBe(jack.of(suits.clubs).second());
});

test("should get unique id of a card", () => {
  expect(jack.of(suits.clubs).first().cardId).toBe("J-♣-0");
});

test("finds all trumps", () => {
  const trumps = [
    ten.of(suits.hearts),
    queen.of(suits.clubs),
    queen.of(suits.spades),
    queen.of(suits.hearts),
    queen.of(suits.diamonds),
    jack.of(suits.clubs),
    jack.of(suits.spades),
    jack.of(suits.hearts),
    jack.of(suits.diamonds),
    ace.of(suits.diamonds),
    ten.of(suits.diamonds),
    king.of(suits.diamonds)
  ];

  trumps.forEach(card => {
    expect(card.isTrump()).toBeTruthy();
  });
});

test("finds all non-trumps", () => {
  const nonTrumps = [
    ace.of(suits.clubs),
    ten.of(suits.clubs),
    king.of(suits.clubs),
    ace.of(suits.spades),
    ten.of(suits.spades),
    king.of(suits.spades),
    ace.of(suits.hearts),
    king.of(suits.hearts)
  ];

  nonTrumps.forEach(card => {
    expect(card.isTrump()).toBeFalsy();
  });
});

test("queen of clubs beats queen of spades", () => {
  const higher = queen.of(suits.clubs);
  const lower = queen.of(suits.spades);
  expect(higher.compareTo(lower)).toBeLessThan(0);
});

test("jack of diamonds is beaten by jack of hearts", () => {
  const lower = jack.of(suits.diamonds);
  const higher = jack.of(suits.hearts);
  expect(lower.compareTo(higher)).toBeGreaterThan(0);
});

test("king of diamonds is beaten by jack of hearts", () => {
  const lower = king.of(suits.diamonds);
  const higher = jack.of(suits.hearts);
  expect(lower.compareTo(higher)).toBeGreaterThan(0);
});

test("first card of two equal cards beats second card", () => {
  const first = ace.of(suits.diamonds);
  const second = ace.of(suits.diamonds);
  expect(first.compareTo(second)).toEqual(0);
});

test("trump beats non-trump", () => {
  const trump = king.of(suits.diamonds);
  const nonTrump = king.of(suits.spades);
  expect(trump.compareTo(nonTrump)).toBeLessThan(0);
});

test("non-trump is beaten by trump", () => {
  const nonTrump = ten.of(suits.clubs);
  const trump = king.of(suits.diamonds);
  expect(nonTrump.compareTo(trump)).toBeGreaterThan(0);
});

test("non-trumps does not beat other non-trump if they belong to different suits", () => {
  expect(ten.of(suits.clubs).compareTo(king.of(suits.spades))).toEqual(0);
});

test("ace of spades beats ten of spades", () => {
  const higherNonTrump = ace.of(suits.spades);
  const lowerNonTrump = ten.of(suits.spades);
  expect(higherNonTrump.compareTo(lowerNonTrump)).toBeLessThan(0);
});

test("king of spades is beaten by ten of spades", () => {
  const lowerNonTrump = king.of(suits.spades);
  const higherNonTrump = ten.of(suits.spades);
  expect(lowerNonTrump.compareTo(higherNonTrump)).toBeGreaterThan(0);
});

test("first non-trump beats other non-trump of same card", () => {
  const firstNonTrump = ace.of(suits.hearts);
  const secondNonTrump = ace.of(suits.hearts);
  expect(firstNonTrump.compareTo(secondNonTrump)).toEqual(0);
});
