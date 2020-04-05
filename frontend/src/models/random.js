import { sample, sampleSize } from "lodash-es";

export function generateNames(numberOfNames) {
  return sampleSize(names, numberOfNames);
}

export function generateNameId() {
  const verb = sample(verbs.en);
  const adjective = sample(adjectives.en);
  const noun = sample(nouns.en);
  return `${verb}-${adjective}-${noun}`;
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

const adjectives = {
  en: [
    "red",
    "blue",
    "yellow",
    "green",
    "purple",
    "orange",
    "black",
    "white",
    "brown",
    "fast",
    "slow",
    "clever",
    "eager",
    "lazy"
  ]
};

const nouns = {
  en: [
    "dog",
    "cat",
    "cow",
    "pig",
    "fish",
    "shark",
    "bird",
    "weasel",
    "snake",
    "ball",
    "rope",
    "bat",
    "swing",
    "slide",
    "couch",
    "table",
    "chair",
    "desk"
  ]
};

const verbs = {
  en: [
    "find",
    "search",
    "get",
    "fetch",
    "smell",
    "touch",
    "see",
    "hear",
    "taste",
    "feel",
    "build",
    "go",
    "run",
    "create"
  ]
};
