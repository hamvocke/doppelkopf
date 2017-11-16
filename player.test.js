import Player from './player';

test('player has a name', () => {
    const player = new Player("Ham");
    expect(player.name).toBe("Ham");
})
