import { ace, ten, king, queen, jack, suites } from '@/models/card'

test('ace has a value of 11', () => {
  const aceOfClubs = ace.of(suites.clubs)
  expect(aceOfClubs.value).toBe(11)
})

test('ten has a value of 10', () => {
  const tenOfDiamonds = ten.of(suites.diamonds)
  expect(tenOfDiamonds.value).toBe(10)
})

test('king has a value of 4', () => {
  const kingOfHearts = king.of(suites.hearts)
  expect(kingOfHearts.value).toBe(4)
})

test('queen has a value of 3', () => {
  const queenOfPikes = queen.of(suites.pikes)
  expect(queenOfPikes.value).toBe(3)
})

test('jack has a value of 2', () => {
  const jackOfClubs = jack.of(suites.clubs)
  expect(jackOfClubs.value).toBe(2)
})

test('jack has a value of 2', () => {
  const jackOfClubs = jack.of(suites.clubs)
  expect(jackOfClubs.value).toBe(2)
})

test('compare two cards', () => {
  expect(jack.of(suites.clubs)).toEqual(jack.of(suites.clubs))
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
    king.of(suites.diamonds)
  ]

  trumps.forEach(card => {
    expect(card.isTrump()).toBeTruthy()
  })
})

test('finds all non-trumps', () => {
  const nonTrumps = [
    ace.of(suites.clubs),
    ten.of(suites.clubs),
    king.of(suites.clubs),
    ace.of(suites.spades),
    ten.of(suites.spades),
    king.of(suites.spades),
    ace.of(suites.hearts),
    king.of(suites.hearts)
  ]

  nonTrumps.forEach(card => {
    expect(card.isTrump()).toBeFalsy()
  })
})

test('queen of clubs beats queen of spades', () => {
  expect(queen.of(suites.clubs).beats(queen.of(suites.spades))).toBeTruthy()
})

test('jack of diamonds is beaten by jack of hearts', () => {
  expect(jack.of(suites.diamonds).beats(jack.of(suites.hearts))).toBeFalsy()
})

test('king of diamonds is beaten by jack of hearts', () => {
  expect(king.of(suites.diamonds).beats(jack.of(suites.hearts))).toBeFalsy()
})

test('first card of two equal cards beats second card', () => {
  expect(ace.of(suites.diamonds).beats(ace.of(suites.diamonds))).toBeTruthy()
})

test('trump beats non-trump', () => {
  expect(king.of(suites.diamonds).beats(king.of(suites.spades))).toBeTruthy()
})

test('non-trump is beaten by trump', () => {
  expect(ten.of(suites.clubs).beats(king.of(suites.diamonds))).toBeFalsy()
})

test('non-trumps does not beat other non-trump if they belong to different suites', () => {
  expect(ten.of(suites.clubs).beats(king.of(suites.spades))).toBeFalsy()
})

test('ace of spades beats ten of spades', () => {
  expect(ace.of(suites.spades).beats(ten.of(suites.spades))).toBeTruthy()
})

test('king of clubs is beaten by ten of clubs', () => {
  expect(king.of(suites.spades).beats(ten.of(suites.spades))).toBeFalsy()
})

test('first non-trump beats other non-trump of same card', () => {
  expect(ace.of(suites.hearts).beats(ace.of(suites.hearts))).toBeTruthy()
})
