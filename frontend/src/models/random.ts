export function generateNames(numberOfNames: number) {
  return sampleSize(names, numberOfNames);
}

/** Returns a random integer between 0 and `exclusiveMax - 1` */
export function randomInt(exclusiveMax: number): number {
  return Math.floor(Math.random() * exclusiveMax);
}

export function sample<T>(array: Array<T>): T | undefined {
  if (array.length === 0) {
    return undefined;
  }

  return array[randomInt(array.length)];
}

/**
 * Picks `number` random elements from `array`.
 */
export function sampleSize<T>(array: Array<T>, n: number = 1): T[] {
  if (!array || array.length === 0 || n <= 0) {
    return [];
  }

  n = Math.min(n, array.length);

  const sampled = new Array<T>();
  const arrayCopy = [...array];

  while (sampled.length < n) {
    const randomIndex = randomInt(sampled.length);
    const pickedItem = arrayCopy.splice(randomIndex, 1)[0]; // mutates `arrayCopy` in place
    sampled.push(pickedItem);
  }

  return sampled.slice();
}

export function chance(percentage: number) {
  return Math.random() <= percentage;
}

const names = [
  "Peter",
  "Wolfgang",
  "Michael",
  "Werner",
  "Klaus",
  "Thomas",
  "Manfred",
  "Helmut",
  "Jürgen",
  "Heinz",
  "Gerhard",
  "Andreas",
  "Hans",
  "Josef",
  "Günter",
  "Dieter",
  "Horst",
  "Walter",
  "Frank",
  "Bernd",
  "Karl",
  "Herbert",
  "Franz",
  "Martin",
  "Uwe",
  "Georg",
  "Heinrich",
  "Stefan",
  "Christian",
  "Karl-Heinz",
  "Rudolf",
  "Kurt",
  "Hermann",
  "Johann",
  "Wilhelm",
  "Siegfried",
  "Rolf",
  "Joachim",
  "Alfred",
  "Rainer",
  "Jörg",
  "Ralf",
  "Erich",
  "Norbert",
  "Bernhard",
  "Willi",
  "Alexander",
  "Ulrich",
  "Markus",
  "Matthias",
  "Harald",
  "Paul",

  // female names

  "Maria",
  "Ursula",
  "Monika",
  "Petra",
  "Elisabeth",
  "Sabine",
  "Renate",
  "Helga",
  "Karin",
  "Brigitte",
  "Ingrid",
  "Erika",
  "Andrea",
  "Gisela",
  "Claudia",
  "Susanne",
  "Gabriele",
  "Christa",
  "Christine",
  "Hildegard",
  "Anna",
  "Birgit",
  "Barbara",
  "Gertrud",
  "Heike",
  "Marianne",
  "Elke",
  "Martina",
  "Angelika",
  "Irmgard",
  "Inge",
  "Ute",
  "Elfriede",
  "Doris",
  "Marion",
  "Ruth",
  "Ulrike",
  "Hannelore",
  "Jutta",
  "Gerda",
  "Kerstin",
  "Ilse",
  "Anneliese",
  "Margarete",
  "Ingeborg",
  "Anja",
  "Edith",
  "Sandra",
  "Waltraud",
  "Beate",
  "Rita",
  "Katharina"
];
