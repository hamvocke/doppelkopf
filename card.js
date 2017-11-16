export const suites = ['clubs', 'diamonds', 'hearts', 'spades'];
export const ranks = ['ace', 'ten', 'king', 'queen', 'jack'];

export default class Card {
    constructor(suite=suites[0], rank) {
        this.suite = suite;
        this.rank = rank;
    }

    get value() {
        return values[this.rank];
    }

    of(suite) {
        return new Card(suite, this.rank);
    }
}

export const ace = new Card(suites[0], ranks[0]);
export const ten = new Card(suites[0], ranks[1]);
export const king = new Card(suites[0], ranks[2]);
export const queen = new Card(suites[0], ranks[3]);
export const jack = new Card(suites[0], ranks[4]);

const values = {
    "ace": 11,
    "ten": 10,
    "king": 4,
    "queen": 3,
    "jack": 2
}
