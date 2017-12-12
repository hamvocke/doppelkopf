import Trick from '@/models/trick';
import { queen, suites } from '@/models/card';

test('new trick is empty', () => {
    expect(new Trick().cards).toHaveLength(0);
});

test('can add card to trick', () => {
    const trick = new Trick();
    const cardToBePlayed = queen.of(suites.spades);

    trick.add(cardToBePlayed);

    expect(trick.cards).toContain(cardToBePlayed);
});
