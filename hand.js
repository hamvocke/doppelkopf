import { queen, suites } from './card';
import { find } from 'lodash';

export default class Hand {
    constructor(cards = []) {
        this.cards = cards;
    }

    isReh() {
        return find(this.cards, queen.of(suites.clubs));
    }

    isKontra() {
        return !this.isReh();
    }

    value() {
        return this.cards
            .map(card => card.value)
            .reduce((acc, value) => acc + value, 0);
    }

    find(card) {
        return find(this.cards, card);
    }
}
