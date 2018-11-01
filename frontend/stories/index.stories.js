import { storiesOf } from "@storybook/vue";

import Scorecard from "@/components/Scorecard";

storiesOf("Scorecard", module).add("empty", () => ({
  components: { Scorecard },
  template: "<Scorecard :scorecard='{}' />"
}));
