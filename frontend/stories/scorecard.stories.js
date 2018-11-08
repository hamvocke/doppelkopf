import { storiesOf } from "@storybook/vue";

import Scorecard from "@/components/Scorecard";
import { Player } from "@/models/player";
import { Scorecard as ScorecardModel } from "@/models/scorecard";

const players = [
  new Player("Player 1"),
  new Player("Player 2"),
  new Player("Player 3"),
  new Player("Player 4")
];
const sc = new ScorecardModel(players);

sc.addScore([players[0], players[2]], 3);
sc.addScore([players[2], players[3]], 2);
sc.addScore([players[0], players[2]], 4);
sc.addScore([players[2], players[0]], 1);

storiesOf("Scorecard", module)
  .add("empty", () => ({
    components: { Scorecard },
    template: "<Scorecard :scorecard='{}' />"
  }))
  .add("with data", () => ({
    components: { Scorecard },
    template: "<Scorecard :scorecard='" + JSON.stringify(sc) + "' :players='" + JSON.stringify(players) + "' />"
  }));
