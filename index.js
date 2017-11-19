import Game from './game';

const game = new Game();

console.log('New game started');

console.log('Players:\n');
game.players.forEach(player => logPlayer(player));

function logPlayer(player) {
    console.log('Player', player.name);
    console.log('Cards on hand:');
    player.hand.cards.forEach(card => console.log('\t' + card.rank + ' of ' + card.suite));
}
