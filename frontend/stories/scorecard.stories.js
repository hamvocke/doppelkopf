import { storiesOf } from "@storybook/vue";

import Scorecard from "@/components/Scorecard";
import { Player } from "@/models/player";
import { Score } from "@/models/score";
import { Scorecard as ScorecardModel } from "@/models/scorecard";

import "@/assets/css/app.css";

const players = [
  new Player("Oswald"),
  new Player("Mercedes"),
  new Player("Annegret"),
  new Player("Giovanni")
];
const sc = new ScorecardModel(players);

sc.addScore([players[0], players[2]], 3);
sc.addScore([players[2], players[3]], 2);
sc.addScore([players[0], players[2]], 4);
sc.addScore([players[2], players[0]], 1);

players[0].points = () => 123;
players[1].points = () => 117;
const score = new Score();
score.evaluate(players);

storiesOf("Scorecard", module).add("with player winning", () => ({
  components: { Scorecard },
  data() {
    return {
      scorecard: sc,
      players: players,
      score: score
    };
  },
  template:
    "<Scorecard :scorecard='scorecard' :players='players' :currentScore='score'/>"
}));
