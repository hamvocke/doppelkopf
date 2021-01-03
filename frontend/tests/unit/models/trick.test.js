import { Trick } from "@/models/trick";
import { Player } from "@/models/player";
import { PlayedCard } from "@/models/playedCard";
import { queen, jack, king, suits, ten, ace } from "@/models/card";
import { extras } from "@/models/extras";

const player1 = new Player("Player 1", true);
const player2 = new Player("Player 2");
const player3 = new Player("Player 3");
const player4 = new Player("Player 4");
const players = [player1, player2, player3, player4];

test("new trick is empty", () => {
  expect(new Trick(players).cards).toHaveLength(0);
});

test("playerPlayedCards always have players length", () => {
  expect(new Trick(players).playerPlayedCards()).toHaveLength(players.length);
});

test("playerPlayedCards are undefined if not played", () => {
  let trick = new Trick(players);
  const cardToBePlayed = queen.of(suits.spades);

  trick.add(cardToBePlayed, player1);

  const expectedCard = new PlayedCard(cardToBePlayed, player1);
  const emptyCardByPlayer2 = new PlayedCard(undefined, player2);
  const emptyCardByPlayer3 = new PlayedCard(undefined, player3);
  const emptyCardByPlayer4 = new PlayedCard(undefined, player4);

  expect(trick.playerPlayedCards()).toEqual([
    expectedCard,
    emptyCardByPlayer2,
    emptyCardByPlayer3,
    emptyCardByPlayer4
  ]);
});

test("can add card to trick", () => {
  const trick = new Trick(players);
  const cardToBePlayed = queen.of(suits.spades);

  trick.add(cardToBePlayed, player1);

  const expectedCard = new PlayedCard(cardToBePlayed, player1);

  expect(trick.cards()).toEqual([expectedCard]);
});

test("should finish a trick if four cards have been played", () => {
  const trick = new Trick(players);

  trick.add(queen.of(suits.spades), player1);
  trick.add(queen.of(suits.hearts), player2);
  trick.add(queen.of(suits.clubs), player3);
  trick.add(queen.of(suits.diamonds), player4);

  expect(trick.isFinished()).toBeTruthy();
});

test("should find card played by player", () => {
  const trick = new Trick(players);
  const cardToBePlayed = queen.of(suits.spades);

  trick.add(cardToBePlayed, player1);

  const expectedCard = new PlayedCard(cardToBePlayed, player1);

  expect(trick.cardBy(player1)).toEqual(expectedCard);
  expect(trick.cardBy(player2)).toBeUndefined();
});

test("should prohibit multiple cards from same player", () => {
  const trick = new Trick(players);

  function invalidMove() {
    trick.add(queen.of(suits.spades), player2);
    trick.add(queen.of(suits.clubs), player2);
  }

  expect(invalidMove).toThrowError(
    "Player " + player2.name + " already played a card"
  );
});

test("should find base card of a trick", () => {
  const trick = new Trick(players);

  const expectedBaseCard = queen.of(suits.spades);

  trick.add(expectedBaseCard, player1);
  trick.add(queen.of(suits.clubs), player2);

  expect(trick.baseCard()).toEqual(expectedBaseCard);
});

test("should return undefined base card for empty trick", () => {
  const trick = new Trick(players);

  expect(trick.baseCard()).toBeUndefined();
});

test("winner for an empty trick should be undefined", () => {
  const trick = new Trick(players);

  expect(trick.winner()).toBeUndefined();
});

test("should find winner for a finished trick", () => {
  const trick = new Trick(players);

  trick.add(king.of(suits.hearts), player2);
  trick.add(ten.of(suits.clubs), player3);
  trick.add(king.of(suits.hearts), player4);
  trick.add(ace.of(suits.hearts), player1);

  expect(trick.winner()).toEqual(player1);
});

test("should find winner for a finished trick - clubs", () => {
  const trick = new Trick(players);

  trick.add(king.of(suits.clubs), player2);
  trick.add(ten.of(suits.spades), player3);
  trick.add(king.of(suits.clubs), player4);
  trick.add(ace.of(suits.clubs), player1);

  expect(trick.winner()).toEqual(player1);
});

test("should find winner for a finished trick - trumps", () => {
  const trick = new Trick(players);

  trick.add(king.of(suits.clubs), player2);
  trick.add(ace.of(suits.clubs), player3);
  trick.add(king.of(suits.diamonds), player4);
  trick.add(ten.of(suits.clubs), player1);

  expect(trick.winner()).toEqual(player4);
});

test("should find winner for an unfinished trick - non-trumps", () => {
  const trick = new Trick(players);

  trick.add(ten.of(suits.spades), player3);
  trick.add(ace.of(suits.hearts), player4);

  expect(trick.winner()).toEqual(player3);
});

test("should find winner for an unfinished trick", () => {
  const trick = new Trick(players);

  trick.add(queen.of(suits.spades), player3);
  trick.add(queen.of(suits.diamonds), player4);
  trick.add(queen.of(suits.clubs), player1);

  expect(trick.winner()).toEqual(player1);
});

test("should return points in a trick", () => {
  const trick = new Trick(players);

  trick.add(queen.of(suits.spades), player3);
  trick.add(queen.of(suits.diamonds), player4);
  trick.add(queen.of(suits.clubs), player1);
  trick.add(queen.of(suits.clubs), player2);

  expect(trick.points()).toEqual(12);
});

describe("extras", () => {
  beforeEach(() => {
    player1.isRe = () => true;
    player2.isRe = () => true;
    player3.isRe = () => false;
    player4.isRe = () => false;
  });

  // tests here

  test("should find Doppelkopf", () => {
    const trick = new Trick(players);

    trick.add(ten.of(suits.spades), player3);
    trick.add(ten.of(suits.spades), player4);
    trick.add(ace.of(suits.spades), player1);
    trick.add(ace.of(suits.spades), player2);

    expect(trick.extras()).toEqual([extras.doppelkopf]);
  });

  test("should catch Fuchs", () => {
    const trick = new Trick(players);

    trick.add(ten.of(suits.hearts), player3);
    trick.add(king.of(suits.spades), player4);
    trick.add(ace.of(suits.diamonds), player1);
    trick.add(ace.of(suits.spades), player2);

    expect(trick.extras()).toEqual([extras.fox]);
  });

  test("should catch two Füchse", () => {
    const trick = new Trick(players);

    trick.add(ten.of(suits.hearts), player3);
    trick.add(king.of(suits.spades), player4);
    trick.add(ace.of(suits.diamonds), player1);
    trick.add(ace.of(suits.diamonds), player2);

    expect(trick.extras()).toEqual([extras.fox, extras.fox]);
  });

  test("should see two Füchse in the trick, catching one", () => {
    const trick = new Trick(players);

    trick.add(ten.of(suits.hearts), player3);
    trick.add(ace.of(suits.diamonds), player4);
    trick.add(ace.of(suits.diamonds), player1);
    trick.add(king.of(suits.spades), player2);

    expect(trick.extras()).toEqual([extras.fox]);
  });

  test("should not detect charlie if it's not the last trick", () => {
    const trick = new Trick(players);

    trick.add(jack.of(suits.hearts), player3);
    trick.add(jack.of(suits.clubs), player4);
    trick.add(ten.of(suits.hearts), player1);
    trick.add(queen.of(suits.spades), player2);

    expect(trick.extras()).toEqual([]);
  });

  test("should catch charlie", () => {
    const trick = new Trick(players);
    trick.setLastTrickInRound();

    trick.add(jack.of(suits.hearts), player3);
    trick.add(jack.of(suits.clubs), player4);
    trick.add(ten.of(suits.hearts), player1);
    trick.add(queen.of(suits.spades), player2);

    expect(trick.extras()).toEqual([extras.charlie_caught]);
  });

  test("should catch two charlies", () => {
    const trick = new Trick(players);
    trick.setLastTrickInRound();

    trick.add(jack.of(suits.clubs), player3);
    trick.add(jack.of(suits.clubs), player4);
    trick.add(ten.of(suits.hearts), player1);
    trick.add(queen.of(suits.spades), player2);

    expect(trick.extras()).toEqual([
      extras.charlie_caught,
      extras.charlie_caught
    ]);
  });

  test("should see charlie being catched by teammate, no extras applied", () => {
    const trick = new Trick(players);
    trick.setLastTrickInRound();

    trick.add(jack.of(suits.diamonds), player3);
    trick.add(jack.of(suits.diamonds), player4);
    trick.add(ten.of(suits.hearts), player1);
    trick.add(jack.of(suits.clubs), player2);

    expect(trick.extras()).toEqual([]);
  });

  test("should see both charlies, one is caught", () => {
    const trick = new Trick(players);
    trick.setLastTrickInRound();

    trick.add(jack.of(suits.diamonds), player3);
    trick.add(jack.of(suits.clubs), player4);
    trick.add(ten.of(suits.hearts), player1);
    trick.add(jack.of(suits.clubs), player2);

    expect(trick.extras()).toEqual([extras.charlie_caught]);
  });

  test("should see charlie winning the trick", () => {
    const trick = new Trick(players);
    trick.setLastTrickInRound();

    trick.add(jack.of(suits.diamonds), player3);
    trick.add(jack.of(suits.diamonds), player4);
    trick.add(ten.of(suits.spades), player1);
    trick.add(jack.of(suits.clubs), player2);

    expect(trick.extras()).toEqual([extras.charlie]);
  });

  test("should see charlie winning the trick, catching a charlie", () => {
    const trick = new Trick(players);
    trick.setLastTrickInRound();

    trick.add(jack.of(suits.diamonds), player3);
    trick.add(jack.of(suits.clubs), player4);
    trick.add(ten.of(suits.spades), player1);
    trick.add(jack.of(suits.clubs), player2);

    expect(trick.extras()).toEqual([extras.charlie_caught, extras.charlie]);
  });

  test("should see charlie winning the trick, catching a charlie and a fox", () => {
    const trick = new Trick(players);
    trick.setLastTrickInRound();

    trick.add(jack.of(suits.diamonds), player3);
    trick.add(jack.of(suits.clubs), player4);
    trick.add(ace.of(suits.diamonds), player1);
    trick.add(jack.of(suits.clubs), player2);

    expect(trick.extras()).toEqual([
      extras.fox,
      extras.charlie_caught,
      extras.charlie
    ]);
  });
});
