import Game from './game';

test('game has players', () => {
    const game = new Game(["Player 1", "Player 2", "Player 3", "Player 4"]);
    expect(game.players[0].name).toBe("Player 1");
    expect(game.players[1].name).toBe("Player 2");
    expect(game.players[2].name).toBe("Player 3");
    expect(game.players[3].name).toBe("Player 4");
})

test('game has a deck', () => {
    const game = new Game([]);
    expect(game.deck).toBeDefined();
})
