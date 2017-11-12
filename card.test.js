import Card from './card';

test('ace has a value of 11', () => {
    const aceOfClubs = new Card("clubs", "ace");
    expect(aceOfClubs.value()).toBe(11);
})

test('ten has a value of 10', () => {
    const tenOfDiamonds = new Card("diamonds", "ten");
    expect(tenOfDiamonds.value()).toBe(10);
})

test('king has a value of 4', () => {
    const kingOfHearts = new Card("hearts", "king");
    expect(kingOfHearts.value()).toBe(4);
})

test('queen has a value of 3', () => {
    const queenOfPikes = new Card("pikes", "queen");
    expect(queenOfPikes.value()).toBe(3);
})

test('jack has a value of 2', () => {
    const jackOfClubs = new Card("clubs", "jack");
    expect(jackOfClubs.value()).toBe(2);
})
