export default class Card {
    constructor(suite, rank) {
	this.suite = suite;
	this.rank = rank;
    }

    get value() {
	return values[this.rank];
    }
}

const values = {
    "ace": 11,
    "ten": 10,
    "king": 4,
    "queen": 3,
    "jack": 2
}
