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
  expect(queen.of(suits.clubs).compareTo(queen.of(suits.spades))).toBeLessThan(0);
});

test("jack of diamonds is beaten by jack of hearts", () => {
  expect(jack.of(suits.diamonds).compareTo(jack.of(suits.hearts))).toBeGreaterThan(0);
});

test("king of diamonds is beaten by jack of hearts", () => {
  expect(king.of(suits.diamonds).compareTo(jack.of(suits.hearts))).toBeGreaterThan(0);
});

test("first card of two equal cards beats second card", () => {
  expect(ace.of(suits.diamonds).compareTo(ace.of(suits.diamonds))).toEqual(0);
});

test("trump beats non-trump", () => {
  expect(king.of(suits.diamonds).compareTo(king.of(suits.spades))).toBeLessThan(0);
});

test("non-trump is beaten by trump", () => {
  expect(ten.of(suits.clubs).compareTo(king.of(suits.diamonds))).toBeGreaterThan(0);
});

test("non-trumps does not beat other non-trump if they belong to different suits", () => {
  expect(ten.of(suits.clubs).compareTo(king.of(suits.spades))).toEqual(0);
});

test("ace of spades beats ten of spades", () => {
  expect(ace.of(suits.spades).compareTo(ten.of(suits.spades))).toBeLessThan(0);
});

test("king of clubs is beaten by ten of clubs", () => {
  expect(king.of(suits.spades).compareTo(ten.of(suits.spades))).toBeGreaterThan(0);
});

test("first non-trump beats other non-trump of same card", () => {
  expect(ace.of(suits.hearts).compareTo(ace.of(suits.hearts))).toEqual(0);
});
