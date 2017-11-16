import Player from './player';
import Deck from './deck';
import { take } from 'lodash';

export default class Game {
    constructor(players) {
        if(players.length !== 4) {
            throw 'a game must have four players';
        }
        this.players = players.map(player => new Player(player));
        this.deck = new Deck();
        this.deal();
    }

    deal() {
        this.players[0].hand = this.deck.cards.slice(0, 10);
        this.players[1].hand = this.deck.cards.slice(10, 20);
        this.players[2].hand = this.deck.cards.slice(20, 30);
        this.players[3].hand = this.deck.cards.slice(30, 40);
    }
}
