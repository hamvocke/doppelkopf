import Player from './player';

test('player adds two numbers', () => {
    const player = new Player("Ham");
    expect(player.add(1,2)).toBe(3);
})
