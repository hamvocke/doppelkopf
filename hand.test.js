import Hand from './hand';
import { suites, ace, ten, king, queen, jack } from './card';

test('a hand with queen of clubs is reh', () => {
    const cards = [
        queen.of(suites.clubs)
    ]
    const hand = new Hand(cards);

    expect(hand.isReh()).toBeTruthy();
    expect(hand.isKontra()).toBeFalsy();
});

test('a hand without queen of clubs is kontra', () => {
    const cards = [
        queen.of(suites.spades)
    ]
    const hand = new Hand(cards);

    expect(hand.isKontra()).toBeTruthy();
    expect(hand.isReh()).toBeFalsy();
});

test('hand has a value', () => {
    const cards = [
        queen.of(suites.spades),
        ten.of(suites.hearts),
        ace.of(suites.diamonds)
    ]
    const hand = new Hand(cards);

    expect(hand.value()).toBe(24);
});

test('empty hand has a value of 0', () => {
    const hand = new Hand([]);

    expect(hand.value()).toBe(0);
});

test('can find card on hand', () => {
    const cards = [
        queen.of(suites.spades)
    ]
    const hand = new Hand(cards);

    expect(hand.find(cards[0])).toEqual(queen.of(suites.spades));
});

test('can not find non-existing card on hand', () => {
    const cards = [
        queen.of(suites.spades)
    ]
    const hand = new Hand(cards);

    expect(hand.find(king.of(suites.spades))).toBeUndefined();
});
