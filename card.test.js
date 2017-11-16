import Card from './card';
import {ace, ten, king, queen, jack} from './card';

test('ace has a value of 11', () => {
    const aceOfClubs = ace.of('clubs');
    expect(aceOfClubs.value).toBe(11);
})

test('ten has a value of 10', () => {
    const tenOfDiamonds = ten.of('diamonds');
    expect(tenOfDiamonds.value).toBe(10);
})

test('king has a value of 4', () => {
    const kingOfHearts = king.of('hearts');
    expect(kingOfHearts.value).toBe(4);
})

test('queen has a value of 3', () => {
    const queenOfPikes = queen.of('pikes');
    expect(queenOfPikes.value).toBe(3);
})

test('jack has a value of 2', () => {
    const jackOfClubs = jack.of('clubs');
    expect(jackOfClubs.value).toBe(2);
})
