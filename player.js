import { find, pull } from 'lodash';

export default class Player {
    constructor(name, game) {
        this.name = name;
        this.hand = [];
        this.game = game;
    }

    play(card) {
        let cardToBePlayed = find(this.hand, card);

        if(!cardToBePlayed) {
            throw 'can\'t play a card that\'s not on the player\'s hand';
        }

        this.game.currentTrick.add(cardToBePlayed);
        pull(this.hand, cardToBePlayed);
    }
}
