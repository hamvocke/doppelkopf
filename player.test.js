import Player from './player';

test('player has a name', () => {
    const player = new Player("Ham");
    expect(player.name).toBe("Ham");
})

test('player has an empty hand', () => {
    const player = new Player("Ham");
    expect(player.hand).toHaveLength(0);
})
