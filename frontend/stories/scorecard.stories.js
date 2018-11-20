import { storiesOf } from "@storybook/vue";

import Scorecard from "@/components/Scorecard";
import { Player } from "@/models/player";
import { Scorecard as ScorecardModel } from "@/models/scorecard";

import "@/assets/css/app.css";

const players = [
  new Player("Oswald"),
  new Player("Mercedes"),
  new Player("Ulf"),
  new Player("Giovanni")
];
const sc = new ScorecardModel(players);

sc.addScore([players[0], players[2]], 3);
sc.addScore([players[2], players[3]], 2);
sc.addScore([players[0], players[2]], 4);
sc.addScore([players[2], players[0]], 1);

storiesOf("Scorecard", module)
  .add("empty", () => ({
    components: { Scorecard },
    template: "<Scorecard :scorecard='{}' :players='{}'/>"
  }))
  .add("with data", () => ({
    components: { Scorecard },
    template:
      "<Scorecard :scorecard='" +
      JSON.stringify(sc) +
      "' :players='" +
      JSON.stringify(players) +
      "' />"
  }));
