import Card from './card';
import { ranks, suites } from './cardConstants';
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

const individualCards = ranks.map(rank => {
    return [
        new Card(suites[0], rank),
        new Card(suites[1], rank),
        new Card(suites[2], rank),
        new Card(suites[3], rank),
    ];
});
