export const suites = {
    clubs: 'clubs',
    diamonds: 'diamonds',
    hearts: 'hearts',
    spades: 'spades'
};

export const ranks = {
    ace: 'ace',
    ten: 'ten',
    king: 'king',
    queen: 'queen',
    jack: 'jack'
};

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

export const ace = new Card(suites.clubs, ranks.ace);
export const ten = new Card(suites.clubs, ranks.ten);
export const king = new Card(suites.clubs, ranks.king);
export const queen = new Card(suites.clubs, ranks.queen);
export const jack = new Card(suites.clubs, ranks.jack);

const values = {
    'ace': 11,
    'ten': 10,
    'king': 4,
    'queen': 3,
    'jack': 2
}
