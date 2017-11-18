import Player from './player';
import Game from './game';
import { king, queen, suites } from './card';

let game;
let player;

beforeEach(() => {
    game = new Game();
    player = new Player('Ham', game);
});

test('player has a name', () => {
    expect(player.name).toBe('Ham');
});

test('player knows their game', () => {
    expect(player.game).toBeDefined();
});

test('new player has an empty hand', () => {
    expect(player.hand).toHaveLength(0);
});

test('player can play card from hand', () => {
    const kingOnHand = king.of(suites.diamonds);
    const queenOnHand = queen.of(suites.spades);
    player.hand = [kingOnHand, queenOnHand];

    player.play(king.of(suites.diamonds));

    expect(player.hand).not.toContain(kingOnHand);
    expect(player.hand).toContain(queenOnHand);
});

test('playing a card adds it to the current trick', () => {
    const queenOnHand = queen.of(suites.spades);
    player.hand = [queenOnHand];

    player.play(queen.of(suites.spades));

    expect(game.currentTrick.cards).toEqual([queenOnHand]);
});


test('player cannot play card that is not on their hand', () => {
    player.hand = [
        king.of(suites.diamonds)
    ];

    function invalidMove() {
        player.play(queen.of(suites.diamonds));
    }

    expect(invalidMove).toThrowError('can\'t play a card that\'s not on the player\'s hand');
});
