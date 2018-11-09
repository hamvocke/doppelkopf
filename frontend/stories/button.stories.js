import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import Button from "@/components/Button";

import "@/assets/css/colors.css";


storiesOf("Button", module)
  .add("plain", () => ({
    components: { Button },
    template: "<Button :onClick='{}'>Some Button</Button>"
  }))
  .add("with callback", () => ({
    components: { Button },
    template: "<Button :onClick='action'>Some Button</Button>",
    methods: { action: action("clicked") }
  }));
