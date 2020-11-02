import VueI18n from "vue-i18n";

import Scorecard from "@/components/Scorecard";
import PointMeter from "@/components/scorecard/PointMeter";
import { Player } from "@/models/player";
import { re, kontra } from "@/models/party";
import { Scorecard as ScorecardModel } from "@/models/scorecard";
import { ScoreBuilder } from "../../tests/builders/scoreBuilder";

import "@/assets/css/app.css";

let locale = require("@/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = locale;

const players = [
  stubPlayer("Oswald", re, 21),
  stubPlayer("Mercedes", re, 60),
  stubPlayer("Annegret", kontra, 99),
  stubPlayer("Giovanni", kontra, 60)
];

function score(winners, losers, points) {
  return new ScoreBuilder()
    .withWinners(re, ...winners)
    .withLosers(kontra, ...losers)
    .withPoints(points)
    .build();
}

const losingSc = new ScorecardModel(players);
const winningSc = new ScorecardModel(players);

function stubPlayer(name, party, points) {
  const stubbedPlayer = new Player(name);
  stubbedPlayer.isRe = () => party === re;
  stubbedPlayer.isKontra = () => party !== re;
  stubbedPlayer.points = () => points;
  return stubbedPlayer;
}

losingSc.addScore(score([players[0], players[2]], [players[1], players[3]], 3));
losingSc.addScore(score([players[2], players[3]], [players[0], players[1]], 2));
losingSc.addScore(score([players[0], players[2]], [players[1], players[3]], 4));
losingSc.addScore(score([players[2], players[0]], [players[1], players[3]], 1));

winningSc.addScore(score([players[2], players[3]], [players[0], players[1]], 2));
winningSc.addScore(score([players[0], players[2]], [players[1], players[3]], 4));
winningSc.addScore(score([players[2], players[0]], [players[1], players[3]], 1));
winningSc.addScore(score([players[0], players[2]], [players[1], players[3]], 3));

const winningScore = score([players[0], players[2]], [players[1], players[3]], 3);
const losingScore = score([players[3], players[2]], [players[1], players[0]], 5);

export default {
  title: "Scorecard"
};

export const losing = () => ({
  components: { Scorecard },
  data() {
    return {
      scorecard: losingSc,
      players: players,
      score: losingScore
    };
  },
  template:
    "<Scorecard :scorecard='scorecard' :players='players' :currentScore='score'/>",
  i18n: new VueI18n(i18nOpts)
});

export const winning = () => ({
  components: { Scorecard },
  data() {
    return {
      scorecard: winningSc,
      players: players,
      score: winningScore
    };
  },
  template:
    "<Scorecard :scorecard='scorecard' :players='players' :currentScore='score'/>",
  i18n: new VueI18n(i18nOpts)
});

export const pointMeter = () => ({
  components: { PointMeter },
  template: "<PointMeter :rePoints='141' :kontraPoints='99' />",
  i18n: new VueI18n(i18nOpts)
});
