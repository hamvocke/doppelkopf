import Game from './game';

const defaultPlayers = ["Player 1", "Player 2", "Player 3", "Player 4"];

test('game has players', () => {
    const game = new Game(defaultPlayers);
    expect(game.players[0].name).toBe("Player 1");
    expect(game.players[1].name).toBe("Player 2");
    expect(game.players[2].name).toBe("Player 3");
    expect(game.players[3].name).toBe("Player 4");
});

test('game must have four players', () => {
    function newGame() {
        new Game(["Player 1", "Player 2", "Player 3"]);
    }

    expect(newGame).toThrowError('a game must have four players');
});

test('game has a deck', () => {
    const game = new Game(defaultPlayers, []);
    expect(game.deck).toBeDefined();
});

test('game deals cards to each player', () => {
    const game = new Game(defaultPlayers);

    expect(game.players[0].hand).toHaveLength(10);
    expect(game.players[1].hand).toHaveLength(10);
    expect(game.players[2].hand).toHaveLength(10);
    expect(game.players[3].hand).toHaveLength(10);
});

test('game starts with an empty trick', () => {
    const game = new Game(defaultPlayers);

    expect(game.currentTrick).toBeDefined();
    expect(game.currentTrick.cards).toHaveLength(0);
});
