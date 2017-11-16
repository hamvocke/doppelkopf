import Card from './card';
import { ranks, suites } from './card';
import { shuffle } from 'lodash';

export default class Deck {
    constructor() {
        this.cards = shuffle([]
            .concat(...individualCards)
            .concat(...individualCards));
    }

    get value() {
        return values[this.rank];
    }
}

const individualCards = Object.values(ranks).map(rank => {
    return [
        new Card(suites.clubs, rank),
        new Card(suites.spades, rank),
        new Card(suites.hearts, rank),
        new Card(suites.diamonds, rank),
    ];
});
