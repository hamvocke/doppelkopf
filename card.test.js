import { Card } from './card';
import {ace, ten, king, queen, jack, suites, compare} from './card';

test('ace has a value of 11', () => {
    const aceOfClubs = ace.of(suites.clubs);
    expect(aceOfClubs.value).toBe(11);
})

test('ten has a value of 10', () => {
    const tenOfDiamonds = ten.of(suites.diamonds);
    expect(tenOfDiamonds.value).toBe(10);
})

test('king has a value of 4', () => {
    const kingOfHearts = king.of(suites.hearts);
    expect(kingOfHearts.value).toBe(4);
})

test('queen has a value of 3', () => {
    const queenOfPikes = queen.of(suites.pikes);
    expect(queenOfPikes.value).toBe(3);
})

test('jack has a value of 2', () => {
    const jackOfClubs = jack.of(suites.clubs);
    expect(jackOfClubs.value).toBe(2);
})

test('jack has a value of 2', () => {
    const jackOfClubs = jack.of(suites.clubs);
    expect(jackOfClubs.value).toBe(2);
})

test('compare two cards', () => {
    expect(jack.of(suites.clubs)).toEqual(jack.of(suites.clubs));
})

test('finds all trumps', () => {
    const trumps = [
        ten.of(suites.hearts),
        queen.of(suites.clubs),
        queen.of(suites.spades),
        queen.of(suites.hearts),
        queen.of(suites.diamonds),
        jack.of(suites.clubs),
        jack.of(suites.spades),
        jack.of(suites.hearts),
        jack.of(suites.diamonds),
        ace.of(suites.diamonds),
        ten.of(suites.diamonds),
        king.of(suites.diamonds),
    ];

    trumps.forEach(card => {
        expect(card.isTrump()).toBeTruthy();
    })
})

test('finds all non-trumps', () => {
    const non_trumps = [
        ace.of(suites.clubs),
        ten.of(suites.clubs),
        king.of(suites.clubs),
        ace.of(suites.spades),
        ten.of(suites.spades),
        king.of(suites.spades),
        ace.of(suites.hearts),
        king.of(suites.hearts),
    ];

    non_trumps.forEach(card => {
        expect(card.isTrump()).toBeFalsy();
    })
})

test('queen of clubs is higher than queen of spades', () => {
    expect(compare(queen.of(suites.clubs), queen.of(suites.spades))).toBe(1);
})

test('jack of diamonds is lower than jack of hearts', () => {
    expect(compare(jack.of(suites.diamonds), jack.of(suites.hearts))).toBe(-1);
})

test('king of diamonds is lower than jack of hearts', () => {
    expect(compare(king.of(suites.diamonds), jack.of(suites.hearts))).toBeLessThanOrEqual(-1);
})

test('ace of diamonds is equal to ace of diamonds', () => {
    expect(compare(ace.of(suites.diamonds), ace.of(suites.diamonds))).toBe(0);
})

test('trump is higher than non-trump', () => {
    expect(compare(king.of(suites.diamonds), king.of(suites.spades))).toBe(1);
})

test('non-trump is lower than trump', () => {
    expect(compare(ten.of(suites.clubs), king.of(suites.diamonds))).toBe(-1);
})

test('two non-trumps are equal if they belong to different suites', () => {
    expect(compare(ten.of(suites.clubs), king.of(suites.spades))).toBe(0);
})

test('ace of spades is higher than ten of spades', () => {
    expect(compare(ace.of(suites.spades), ten.of(suites.spades))).toBe(1);
})

test('king of clubs is lower than ten of clubs', () => {
    expect(compare(king.of(suites.spades), ten.of(suites.spades))).toBeLessThanOrEqual(-1);
})

test('ace of hearts is equal to ace of hearts', () => {
    expect(compare(ace.of(suites.hearts), ace.of(suites.hearts))).toBe(0);
})
