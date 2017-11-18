import Player from './player';
import { king, queen, suites } from './card';


test('player has a name', () => {
    const player = new Player("Ham");
    expect(player.name).toBe("Ham");
});

test('new player has an empty hand', () => {
    const player = new Player("Ham");
    expect(player.hand).toHaveLength(0);
});

test('player can play card from hand', () => {
    const player = new Player("Ham");
    const kingOnHand = king.of(suites.diamonds);
    const queenOnHand = queen.of(suites.spades);
    player.hand = [kingOnHand, queenOnHand];

    player.play(king.of(suites.diamonds));

    expect(player.hand).not.toContain(kingOnHand);
    expect(player.hand).toContain(queenOnHand);
});

test('player cannot play card that is not on their hand', () => {
    const player = new Player('Ham');
    player.hand = [
        king.of(suites.diamonds)
    ];

    function invalidMove() {
        player.play(queen.of(suites.diamonds));
    }

    expect(invalidMove).toThrowError('can\'t play a card that\'s not on the player\'s hand');
});
