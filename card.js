import { some, findIndex } from 'lodash';

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

const values = {
    'ace': 11,
    'ten': 10,
    'king': 4,
    'queen': 3,
    'jack': 2
};

export class Card {
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

    isTrump() {
        return some(trumps, this);
    }

    beats(anotherCard) {
        const thisIsTrump = this.isTrump();
        const otherCardIsTrump = anotherCard.isTrump();

        if(thisIsTrump && !otherCardIsTrump) {
            return true;
        }

        if(!thisIsTrump && otherCardIsTrump) {
            return false;
        }

        if (thisIsTrump && otherCardIsTrump) {
            return findIndex(trumps, anotherCard) - findIndex(trumps, this) >= 0 ? true : false;
        }

        if (!thisIsTrump && !otherCardIsTrump) {
            if(this.suite === anotherCard.suite) {
                return this.value - anotherCard.value >= 0 ? true : false;
            }
        }

        return false;
    }
}

function compare(oneCard, anotherCard) {
    return findIndex(cardOrder, anotherCard) - findIndex(cardOrder, oneCard);
}

export const ace = new Card(suites.clubs, ranks.ace);
export const ten = new Card(suites.clubs, ranks.ten);
export const king = new Card(suites.clubs, ranks.king);
export const queen = new Card(suites.clubs, ranks.queen);
export const jack = new Card(suites.clubs, ranks.jack);

const trumps = [
    ten.of(suites.hearts),
    queen.of(suites.clubs),
    queen.of(suites.spades),
    queen.of(suites.hearts),
    queen.of(suites.diamonds),
    jack.of(suites.clubs),
    jack.of(suites.spades),
    jack.of(suites.hearts),
    jack.of(suites.diamonds),
    ace.of(suites.diamonds),
    ten.of(suites.diamonds),
    king.of(suites.diamonds),
];

const cardOrder = [
    ten.of(suites.hearts),
    queen.of(suites.clubs),
    queen.of(suites.spades),
    queen.of(suites.hearts),
    queen.of(suites.diamonds),
    jack.of(suites.clubs),
    jack.of(suites.spades),
    jack.of(suites.hearts),
    jack.of(suites.diamonds),
    ace.of(suites.diamonds),
    ten.of(suites.diamonds),
    king.of(suites.diamonds),
    ace.of(suites.clubs),
    ten.of(suites.clubs),
    king.of(suites.clubs),
    ace.of(suites.spades),
    ten.of(suites.spades),
    king.of(suites.spades),
    ace.of(suites.hearts),
    king.of(suites.hearts),
];

export { compare };
