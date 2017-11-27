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
}

function compare(oneCard, anotherCard) {
    const aIsTrump = oneCard.isTrump();
    const bIsTrump = anotherCard.isTrump();

    if(aIsTrump && !bIsTrump) {
        return 1;
    }

    if(!aIsTrump && bIsTrump) {
        return -1;
    }

    if (aIsTrump && bIsTrump) {
        const aIndex = findIndex(trumps, oneCard);
        const bIndex = findIndex(trumps, anotherCard);

        if(aIndex == bIndex) {
            return 0;
        }

        if(aIndex < bIndex) {
            return 1;
        }

        return -1;
    }

    if (!aIsTrump && !bIsTrump) {
        if(oneCard.suite === anotherCard.suite) {
            if(oneCard.value > anotherCard.value) {
                return 1;
            }

            if(oneCard.value == anotherCard.value) {
                return 0;
            }

            return -1
        }

        return 0;
    }

    return -1;
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

export { compare };
