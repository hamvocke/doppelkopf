import { queen, suites } from './card';
import { find, pull } from 'lodash';

export default class Hand {
    constructor(cards = []) {
        this.cards = cards;
    }

    isRe() {
        return find(this.cards, queen.of(suites.clubs));
    }

    isKontra() {
        return !this.isRe();
    }

    value() {
        return this.cards
            .map(card => card.value)
            .reduce((acc, value) => acc + value, 0);
    }

    find(card) {
        return find(this.cards, card);
    }

    remove(card) {
        if(!this.find(card)) {
            throw 'can\'t remove card that isn\'nt on hand';
        }

        pull(this.cards, card);
    }
}
