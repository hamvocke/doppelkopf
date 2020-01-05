import VueI18n from "vue-i18n";

import Scorecard from "@/components/Scorecard";
import PointMeter from "@/components/scorecard/PointMeter";
import { Player } from "@/models/player";
import { Score } from "@/models/score";
import { re, kontra } from "@/models/parties";
import { Scorecard as ScorecardModel } from "@/models/scorecard";

import "@/assets/css/app.css";

let locale = require("@/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = locale;

const playersWithHumanLosing = [
  stubPlayer("Oswald", re, 50),
  stubPlayer("Mercedes", re, 60),
  stubPlayer("Annegret", kontra, 70),
  stubPlayer("Giovanni", kontra, 60)
];

const playersWithHumanWinning = [
  stubPlayer("Oswald", re, 70),
  stubPlayer("Mercedes", re, 60),
  stubPlayer("Annegret", kontra, 50),
  stubPlayer("Giovanni", kontra, 60)
];

const losingSc = new ScorecardModel(playersWithHumanLosing);
const winningSc = new ScorecardModel(playersWithHumanWinning);

function stubPlayer(name, party, points) {
  const stubbedPlayer = new Player(name);
  stubbedPlayer.isRe = () => party === re;
  stubbedPlayer.isKontra = () => party !== re;
  stubbedPlayer.points = () => points;
  return stubbedPlayer;
}

losingSc.addScore([playersWithHumanLosing[0], playersWithHumanLosing[2]], 3);
losingSc.addScore([playersWithHumanLosing[2], playersWithHumanLosing[3]], 2);
losingSc.addScore([playersWithHumanLosing[0], playersWithHumanLosing[2]], 4);
losingSc.addScore([playersWithHumanLosing[2], playersWithHumanLosing[0]], 1);

winningSc.addScore([playersWithHumanWinning[2], playersWithHumanWinning[3]], 2);
winningSc.addScore([playersWithHumanWinning[0], playersWithHumanWinning[2]], 4);
winningSc.addScore([playersWithHumanWinning[2], playersWithHumanWinning[0]], 1);
winningSc.addScore([playersWithHumanWinning[0], playersWithHumanWinning[2]], 3);

const losingScore = new Score();
losingScore.evaluate(playersWithHumanLosing);

const winningScore = new Score();
winningScore.evaluate(playersWithHumanWinning);

export default {
  title: "Scorecard"
};

export const losing = () => ({
  components: { Scorecard },
  data() {
    return {
      scorecard: losingSc,
      players: playersWithHumanLosing,
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
      players: playersWithHumanWinning,
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
