import Hand from './hand';
import { ace, ten, king, queen, jack } from './card';

test('a deck with queen of clubs makes reh', () => {
    const cards = [
        queen.of('clubs')
    ]
    const hand = new Hand(cards);
    expect(hand.isReh()).toBeTruthy();
    expect(hand.isKontra()).toBeFalsy();
})

test('hand is kontra', () => {
    const cards = [
        queen.of('spades')
    ]
    const hand = new Hand();
    expect(hand.isKontra()).toBeTruthy();
    expect(hand.isReh()).toBeFalsy();
})
