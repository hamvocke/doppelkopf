import { find, pull } from 'lodash';

export default class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    play(card) {
        let cardToBePlayed = find(this.hand, card);

        if(!cardToBePlayed) {
            throw 'can\'t play a card that\'s not on the player\'s hand';
        }

        pull(this.hand, cardToBePlayed);
    }
}
