import Hand from './hand';

export default class Player {
    constructor(name, game) {
        this.name = name;
        this.hand = new Hand();
        this.game = game;
    }

    play(card) {
        let cardToBePlayed = this.hand.find(card);

        if(!cardToBePlayed) {
            throw 'can\'t play a card that\'s not on the player\'s hand';
        }

        this.game.currentTrick.add(cardToBePlayed);
        this.hand.remove(cardToBePlayed);
    }
}
