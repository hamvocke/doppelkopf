import Player from './player';
import Deck from './deck';

export default class Game {
    constructor(players) {
        this.players = players.map(player => new Player(player));
        this.deck = new Deck();
    }
}
